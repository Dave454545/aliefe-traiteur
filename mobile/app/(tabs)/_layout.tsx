import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, Pressable, View, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FloatingContactButton } from "@/components/FloatingContactButton";
import { TAB_BAR_HEIGHT, fonts } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";

// On web (PWA), the tab bar must be pinned to the true bottom of the visual
// viewport rather than the end of the document flow — otherwise the browser's
// safe-area gutter (home indicator / gesture bar) renders as blank space
// below it. `position: "fixed"` isn't part of RN's ViewStyle type, hence the cast.
const webFixedStyle: ViewStyle | undefined =
  Platform.OS === "web"
    ? ({ position: "fixed", left: 0, right: 0, width: "100%" } as unknown as ViewStyle)
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
            ...webFixedStyle,
            bottom: 0,
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
