import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, Pressable, Text, View, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FloatingContactButton } from "@/components/FloatingContactButton";
import { TAB_BAR_HEIGHT, fonts } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";

// TEMPORARY diagnostic overlay to find why the tab bar leaves a blank strip
// on some Android PWA installs — shows the real browser-measured numbers
// instead of guessing. Remove once the root cause is confirmed.
function DebugSafeArea() {
  const [info, setInfo] = React.useState("");
  React.useEffect(() => {
    if (Platform.OS !== "web" || typeof document === "undefined") return;
    const probe = document.createElement("div");
    probe.style.position = "fixed";
    probe.style.bottom = "0";
    probe.style.left = "0";
    probe.style.height = "0";
    probe.style.width = "0";
    probe.style.paddingBottom = "env(safe-area-inset-bottom)";
    // Second probe reads the clamped value actually used by the tab bar, so the
    // readout shows both the raw inset and what we render against.
    probe.style.paddingTop = "min(env(safe-area-inset-bottom), 34px)";
    probe.style.visibility = "hidden";
    document.body.appendChild(probe);
    const probed = window.getComputedStyle(probe);
    const envBottom = probed.paddingBottom;
    const envClamped = probed.paddingTop;
    document.body.removeChild(probe);
    const standalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    const bar = document.querySelector('[role="tablist"]')?.parentElement as HTMLElement | null;
    const barRect = bar?.getBoundingClientRect();
    setInfo(
      `env-bottom=${envBottom} clamped=${envClamped} innerH=${window.innerHeight} vvH=${Math.round(window.visualViewport?.height ?? -1)} docH=${document.documentElement.clientHeight} standalone=${String(standalone)} barBottom=${barRect ? Math.round(barRect.bottom) : "?"} barH=${barRect ? Math.round(barRect.height) : "?"} ua=${navigator.userAgent.slice(0, 60)}`
    );
  }, []);
  if (Platform.OS !== "web" || !info) return null;
  return (
    <View
      style={
        {
          position: "fixed",
          top: 4,
          left: 4,
          right: 4,
          zIndex: 9999,
          backgroundColor: "rgba(0,0,0,0.8)",
          padding: 6,
          borderRadius: 6,
        } as unknown as ViewStyle
      }
    >
      <Text style={{ color: "#fff", fontSize: 9 }} selectable>
        {info}
      </Text>
    </View>
  );
}

// On web (PWA), the tab bar must be pinned to the true bottom of the visual
// viewport rather than the end of the document flow — otherwise the browser's
// safe-area gutter (home indicator / gesture bar) renders as blank space
// below it. `position: "fixed"` isn't part of RN's ViewStyle type, hence the cast.
//
// The height/padding also bypass `useSafeAreaInsets()` on web: that hook goes
// through react-native-safe-area-context's web polyfill (a hidden div sampled
// once on mount), which can report a stale/inflated bottom inset in
// installed-PWA mode. Reading the CSS env() value directly has no polyfill in
// between.
//
// The value is clamped because the inset is what drives the blank strip: the
// bar's own background extends `inset + padding` below the icons, so an
// oversized inset (seen on Android PWA installs reporting far more than the
// ~24px a gesture bar actually needs) reads as dead white space. No phone's
// home indicator / gesture bar needs more than ~34px, so anything beyond that
// is bogus and clipping it costs nothing on devices reporting sane values.
const SAFE_BOTTOM = "min(env(safe-area-inset-bottom), 34px)";

const webFixedStyle: ViewStyle | undefined =
  Platform.OS === "web"
    ? ({
        position: "fixed",
        left: 0,
        right: 0,
        width: "100%",
        height: `calc(${TAB_BAR_HEIGHT}px + ${SAFE_BOTTOM})`,
        // 6px (rather than 8) top/bottom so the label baseline isn't clipped:
        // this leaves 52px of content box for a 22px icon + its 4px margin +
        // the ~14px label line box.
        paddingTop: 6,
        paddingBottom: `calc(6px + ${SAFE_BOTTOM})`,
      } as unknown as ViewStyle)
    : undefined;

// Subtle press feedback (scale down) matching the FAB's micro-interaction.
function AnimatedTabBarButton({ children, style, ...props }: any) {
  return (
    <Pressable
      {...props}
      style={style}
      android_ripple={null}
    >
      {({ pressed }: { pressed: boolean }) => (
        <View style={{ transform: [{ scale: pressed ? 0.9 : 1 }], opacity: pressed ? 0.85 : 1 }}>
          {typeof children === "function" ? children({ pressed }) : children}
        </View>
      )}
    </Pressable>
  );
}

export default function TabsLayout() {
  const { colors } = useTheme();
  const { t } = useLocale();
  const insets = useSafeAreaInsets();

  const icon = (name: React.ComponentProps<typeof MaterialCommunityIcons>["name"], size = 22) =>
    function TabIcon({ color }: { color: string }) {
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
    };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <DebugSafeArea />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.inkFaint,
          tabBarButton: AnimatedTabBarButton,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.rule,
            borderTopWidth: 1,
            height: TAB_BAR_HEIGHT + insets.bottom,
            paddingTop: 8,
            paddingBottom: 8 + insets.bottom,
            zIndex: 100,
            bottom: 0,
            ...webFixedStyle,
          },
          tabBarLabelStyle: {
            fontFamily: fonts.body,
            fontSize: 10.5,
            letterSpacing: 0.2,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{ title: t("nav.home"), tabBarIcon: icon("home-outline") }}
        />
        <Tabs.Screen
          name="menu"
          options={{ title: t("nav.menu"), tabBarIcon: icon("silverware-fork-knife", 21) }}
        />
        <Tabs.Screen
          name="evenementiel"
          options={{ title: t("nav.events"), tabBarIcon: icon("calendar-blank-outline", 21) }}
        />
        <Tabs.Screen
          name="galerie"
          options={{ title: t("nav.gallery"), tabBarIcon: icon("image-outline", 21) }}
        />
        <Tabs.Screen
          name="contact"
          options={{ title: t("nav.contact"), tabBarIcon: icon("phone-outline", 20) }}
        />
      </Tabs>
      <FloatingContactButton />
    </View>
  );
}
