import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Animated, Easing, Modal, Platform, Pressable, StyleSheet, Text, View, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fonts, radius, SAFE_AREA_BOTTOM_CSS, spacing, TAB_BAR_HEIGHT } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import { callPhone, openWhatsapp } from "@/lib/contact";

export function FloatingContactButton() {
  const { colors } = useTheme();
  const { t } = useLocale();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const show = () => {
    setOpen(true);
    Animated.timing(anim, { toValue: 1, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  };
  const hide = () => {
    Animated.timing(anim, { toValue: 0, duration: 160, easing: Easing.in(Easing.cubic), useNativeDriver: true }).start(() =>
      setOpen(false)
    );
  };

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t("common.contactUs")}
        onPress={show}
        style={({ pressed }) => [
          styles.fab,
          {
            // Always clear the tab bar (its content height + safe-area inset) with a
            // fixed visual margin on top, so it never overlaps it at any screen size.
            // On web this reads env(safe-area-inset-bottom) directly rather than via
            // useSafeAreaInsets() — see the note in app/(tabs)/_layout.tsx on why the
            // web polyfill's JS-computed inset can't be trusted for this value.
            bottom:
              Platform.OS === "web"
                ? (`calc(${SAFE_AREA_BOTTOM_CSS} + ${
                    TAB_BAR_HEIGHT + spacing.md
                  }px)` as unknown as number)
                : insets.bottom + TAB_BAR_HEIGHT + spacing.md,
            backgroundColor: colors.accent,
            shadowColor: colors.shadow,
            transform: [{ scale: pressed ? 0.94 : 1 }],
          },
        ]}
      >
        <Ionicons name="chatbubble-ellipses" size={22} color={colors.accentOn} />
      </Pressable>

      <Modal visible={open} transparent animationType="none" onRequestClose={hide}>
        <Pressable style={[styles.backdrop, { backgroundColor: colors.overlay }]} onPress={hide}>
          <Animated.View
            style={[
              styles.sheet,
              {
                backgroundColor: colors.surface,
                borderColor: colors.rule,
                paddingBottom: insets.bottom + spacing.lg,
                opacity: anim,
                transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
              },
            ]}
          >
            <View style={[styles.handle, { backgroundColor: colors.ruleStrong }]} />
            <Text style={[styles.title, { color: colors.ink, fontFamily: fonts.display }]}>{t("common.contactUs")}</Text>
            <Text style={[styles.subtitle, { color: colors.inkMuted, fontFamily: fonts.body }]}>
              {t("common.contactUsSubtitle")}
            </Text>

            <Row
              icon="call"
              label={t("common.call")}
              sublabel={t("common.callSubtitle")}
              onPress={() => {
                hide();
                callPhone();
              }}
            />
            <View style={[styles.divider, { backgroundColor: colors.rule }]} />
            <Row
              icon="logo-whatsapp"
              label={t("common.whatsapp")}
              sublabel={t("common.whatsappSubtitle")}
              onPress={() => {
                hide();
                openWhatsapp(t("contact.whatsappMessage"));
              }}
            />
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}

function Row({
  icon,
  label,
  sublabel,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  sublabel: string;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, { opacity: pressed ? 0.7 : 1 }]}>
      <View style={[styles.rowIcon, { backgroundColor: colors.surfaceAlt, borderColor: colors.rule }]}>
        <Ionicons name={icon} size={20} color={colors.accent} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: fonts.bodySemiBold, fontSize: 15, color: colors.ink }}>{label}</Text>
        <Text style={{ fontFamily: fonts.body, fontSize: 12, color: colors.inkMuted, marginTop: 1 }}>{sublabel}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.inkFaint} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    // "fixed" keeps it pinned to the viewport on web/PWA regardless of page
    // scroll; native falls back to "absolute" within the tabs layout view.
    position: Platform.OS === "web" ? ("fixed" as unknown as ViewStyle["position"]) : "absolute",
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    zIndex: 50,
  },
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    opacity: 0.6,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 4,
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
