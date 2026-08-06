import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fonts, radius, spacing } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";

type Tab = "ios" | "android";

function detectTab(): Tab {
  if (Platform.OS === "web" && typeof navigator !== "undefined" && /android/i.test(navigator.userAgent || "")) {
    return "android";
  }
  return "ios";
}

const iosSteps = [
  { icon: "compass-outline", titleKey: "install.iosStep1Title", textKey: "install.iosStep1Text" },
  { icon: "share-outline", titleKey: "install.iosStep2Title", textKey: "install.iosStep2Text" },
  { icon: "add-circle-outline", titleKey: "install.iosStep3Title", textKey: "install.iosStep3Text" },
  { icon: "checkmark-circle-outline", titleKey: "install.iosStep4Title", textKey: "install.iosStep4Text" },
] as const;

const androidSteps = [
  { icon: "logo-chrome", titleKey: "install.androidStep1Title", textKey: "install.androidStep1Text" },
  { icon: "ellipsis-vertical", titleKey: "install.androidStep2Title", textKey: "install.androidStep2Text" },
  { icon: "download-outline", titleKey: "install.androidStep3Title", textKey: "install.androidStep3Text" },
  { icon: "checkmark-circle-outline", titleKey: "install.androidStep4Title", textKey: "install.androidStep4Text" },
] as const;

export default function InstallerScreen() {
  const { colors } = useTheme();
  const { t } = useLocale();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<Tab>("ios");

  useEffect(() => {
    setTab(detectTab());
  }, []);

  const steps = tab === "ios" ? iosSteps : androidSteps;
  const notice = tab === "ios" ? t("install.iosNotice") : t("install.androidNotice");

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.xxl }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backButton, { backgroundColor: colors.surface, borderColor: colors.rule }]}
        >
          <Ionicons name="arrow-back" size={18} color={colors.ink} />
        </Pressable>
      </View>

      <View style={styles.head}>
        <Text style={[styles.title, { color: colors.ink, fontFamily: fonts.display }]}>
          {t("install.guideTitle")}
        </Text>
        <Text style={[styles.subtitle, { color: colors.inkMuted, fontFamily: fonts.body }]}>
          {t("install.guideSubtitle")}
        </Text>
      </View>

      <View style={[styles.tabs, { backgroundColor: colors.surface, borderColor: colors.rule }]}>
        <TabButton label={t("install.tabIos")} active={tab === "ios"} onPress={() => setTab("ios")} />
        <TabButton label={t("install.tabAndroid")} active={tab === "android"} onPress={() => setTab("android")} />
      </View>

      <View style={[styles.notice, { backgroundColor: colors.surfaceAlt, borderColor: colors.rule }]}>
        <Ionicons name="information-circle-outline" size={16} color={colors.accent} />
        <Text style={[styles.noticeText, { color: colors.inkMuted, fontFamily: fonts.body }]}>{notice}</Text>
      </View>

      <View style={styles.steps}>
        {steps.map((step, index) => (
          <View key={step.titleKey} style={styles.step}>
            <View style={styles.stepLeft}>
              <View style={[styles.stepNumber, { backgroundColor: colors.accent }]}>
                <Text style={[styles.stepNumberText, { color: colors.accentOn, fontFamily: fonts.bodySemiBold }]}>
                  {index + 1}
                </Text>
              </View>
              {index < steps.length - 1 && <View style={[styles.stepLine, { backgroundColor: colors.rule }]} />}
            </View>
            <View style={[styles.stepCard, { backgroundColor: colors.surface, borderColor: colors.rule }]}>
              <View style={styles.stepCardHead}>
                <Ionicons name={step.icon as never} size={18} color={colors.accent} />
                <Text style={[styles.stepTitle, { color: colors.ink, fontFamily: fonts.bodySemiBold }]}>
                  {t(step.titleKey)}
                </Text>
              </View>
              <Text style={[styles.stepText, { color: colors.inkMuted, fontFamily: fonts.body }]}>
                {t(step.textKey)}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={[styles.outro, { color: colors.inkMuted, fontFamily: fonts.body }]}>{t("install.outro")}</Text>
    </ScrollView>
  );
}

function TabButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tabButton, active && { backgroundColor: colors.accent }]}
    >
      <Text
        style={[
          styles.tabButtonText,
          { color: active ? colors.accentOn : colors.inkMuted, fontFamily: fonts.bodySemiBold },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  head: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  title: {
    fontSize: 26,
  },
  subtitle: {
    fontSize: 13.5,
    lineHeight: 19,
    marginTop: 6,
    maxWidth: 320,
  },
  tabs: {
    flexDirection: "row",
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    padding: 4,
    borderRadius: radius.pill,
    borderWidth: 1,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    borderRadius: radius.pill,
    paddingVertical: 10,
    alignItems: "center",
  },
  tabButtonText: {
    fontSize: 13,
  },
  notice: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    padding: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
  },
  steps: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  step: {
    flexDirection: "row",
    gap: spacing.md,
  },
  stepLeft: {
    alignItems: "center",
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    fontSize: 13,
  },
  stepLine: {
    width: 1,
    flex: 1,
    marginVertical: 4,
  },
  stepCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  stepCardHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 14.5,
  },
  stepText: {
    fontSize: 12.5,
    lineHeight: 18,
  },
  outro: {
    fontSize: 12.5,
    lineHeight: 19,
    textAlign: "center",
    paddingHorizontal: spacing.xl,
    marginTop: spacing.sm,
  },
});
