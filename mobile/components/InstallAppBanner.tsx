import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { fonts, radius, spacing } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";

const DISMISS_KEY = "aliefe.installBannerDismissedAt";
const DISMISS_DAYS = 14;

type Kind = "ios" | "android";

function detectKind(): Kind | null {
  if (Platform.OS !== "web" || typeof navigator === "undefined") return null;
  const ua = navigator.userAgent || "";
  const isStandalone =
    (typeof window !== "undefined" && window.matchMedia?.("(display-mode: standalone)").matches) ||
    (navigator as unknown as { standalone?: boolean }).standalone === true;
  if (isStandalone) return null;
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  if (/android/i.test(ua)) return "android";
  return null;
}

export function InstallAppBanner() {
  const { colors } = useTheme();
  const { t } = useLocale();
  const router = useRouter();
  const [kind, setKind] = useState<Kind | null>(null);
  const [visible, setVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<{ prompt: () => void; userChoice: Promise<unknown> } | null>(
    null
  );

  useEffect(() => {
    const detected = detectKind();
    if (!detected) return;
    setKind(detected);

    AsyncStorage.getItem(DISMISS_KEY).then((stored) => {
      if (stored) {
        const daysSince = (Date.now() - Number(stored)) / (1000 * 60 * 60 * 24);
        if (daysSince < DISMISS_DAYS) return;
      }
      setVisible(true);
    });

    if (detected === "android") {
      const handler = (event: Event) => {
        event.preventDefault();
        setDeferredPrompt(event as unknown as { prompt: () => void; userChoice: Promise<unknown> });
      };
      window.addEventListener("beforeinstallprompt", handler);
      return () => window.removeEventListener("beforeinstallprompt", handler);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    AsyncStorage.setItem(DISMISS_KEY, String(Date.now())).catch(() => {});
  };

  const handlePrimary = async () => {
    if (kind === "android" && deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice.catch(() => {});
      setDeferredPrompt(null);
      dismiss();
      return;
    }
    router.push("/installer");
  };

  if (!visible || !kind) return null;

  return (
    <View style={[styles.banner, { backgroundColor: colors.surface, borderColor: colors.rule }]}>
      <View style={[styles.icon, { backgroundColor: colors.surfaceAlt, borderColor: colors.rule }]}>
        <Ionicons name="download-outline" size={18} color={colors.accent} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: colors.ink, fontFamily: fonts.bodySemiBold }]}>
          {t("install.bannerTitle")}
        </Text>
        <Text style={[styles.subtitle, { color: colors.inkMuted, fontFamily: fonts.body }]}>
          {kind === "ios" ? t("install.bannerSubtitleIos") : t("install.bannerSubtitleAndroid")}
        </Text>
      </View>
      <Pressable
        onPress={handlePrimary}
        style={({ pressed }) => [styles.cta, { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1 }]}
      >
        <Text style={[styles.ctaText, { color: colors.accentOn, fontFamily: fonts.bodySemiBold }]}>
          {t("install.bannerCta")}
        </Text>
      </Pressable>
      <Pressable onPress={dismiss} hitSlop={10} style={styles.close}>
        <Ionicons name="close" size={16} color={colors.inkFaint} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.lg,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 12.5,
  },
  subtitle: {
    fontSize: 11,
    marginTop: 1,
  },
  cta: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
  ctaText: {
    fontSize: 12,
  },
  close: {
    padding: 2,
  },
});
