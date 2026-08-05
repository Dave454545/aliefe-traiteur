import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fonts, radius, spacing } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import { getImage } from "@/lib/images";

export default function AboutScreen() {
  const { colors } = useTheme();
  const { t, tList } = useLocale();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const values = tList("about.values");

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xxl }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageRow}>
        <Image source={getImage("7")} style={styles.image} contentFit="cover" />
        <Image source={getImage("8")} style={[styles.image, { marginTop: spacing.xl }]} contentFit="cover" />
        <View style={[styles.imageShade, { backgroundColor: colors.overlay }]} />
        <Pressable
          onPress={() => router.back()}
          style={[styles.backButton, { top: insets.top + spacing.sm, backgroundColor: "rgba(20,32,27,0.55)" }]}
        >
          <Ionicons name="arrow-back" size={19} color="#F6F1E6" />
        </Pressable>
      </View>

      <View style={styles.body}>
        <Text style={[styles.eyebrow, { color: colors.accent, fontFamily: fonts.bodySemiBold }]}>
          {t("about.eyebrow")}
        </Text>
        <Text style={[styles.title, { color: colors.ink, fontFamily: fonts.display }]}>{t("about.title")}</Text>
        <Text style={[styles.baseline, { color: colors.accentLight, fontFamily: fonts.displayItalicRegular }]}>
          {t("about.baseline")}
        </Text>

        <Text style={[styles.paragraph, { color: colors.inkMuted, fontFamily: fonts.body }]}>
          {t("about.paragraph1")}
        </Text>
        <Text style={[styles.paragraph, { color: colors.inkMuted, fontFamily: fonts.body }]}>
          {t("about.paragraph2")}
        </Text>

        <View style={styles.row}>
          <View style={[styles.miniCard, { backgroundColor: colors.surface, borderColor: colors.rule }]}>
            <Text style={[styles.miniTitle, { color: colors.accent, fontFamily: fonts.bodySemiBold }]}>
              {t("about.missionTitle")}
            </Text>
            <Text style={[styles.miniText, { color: colors.inkMuted, fontFamily: fonts.body }]}>
              {t("about.missionText")}
            </Text>
          </View>
          <View style={[styles.miniCard, { backgroundColor: colors.surface, borderColor: colors.rule }]}>
            <Text style={[styles.miniTitle, { color: colors.accent, fontFamily: fonts.bodySemiBold }]}>
              {t("about.visionTitle")}
            </Text>
            <Text style={[styles.miniText, { color: colors.inkMuted, fontFamily: fonts.body }]}>
              {t("about.visionText")}
            </Text>
          </View>
        </View>

        <Text style={[styles.valuesTitle, { color: colors.ink, fontFamily: fonts.display }]}>
          {t("about.valuesTitle")}
        </Text>
        <View style={styles.values}>
          {values.map((v) => (
            <View key={v} style={[styles.valueChip, { borderColor: colors.ruleStrong }]}>
              <Text style={[styles.valueText, { color: colors.ink, fontFamily: fonts.body }]}>{v}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageRow: {
    flexDirection: "row",
    gap: spacing.md,
    height: 220,
    paddingHorizontal: spacing.lg,
  },
  image: {
    flex: 1,
    borderRadius: radius.lg,
  },
  imageShade: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 90,
  },
  backButton: {
    position: "absolute",
    left: spacing.lg + spacing.sm,
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    padding: spacing.lg,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    marginTop: spacing.lg,
  },
  title: {
    fontSize: 30,
    marginTop: 4,
  },
  baseline: {
    fontSize: 15,
    marginTop: 4,
    marginBottom: spacing.md,
  },
  paragraph: {
    fontSize: 14.5,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.md,
  },
  miniCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  miniTitle: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  miniText: {
    fontSize: 12.5,
    lineHeight: 18,
  },
  valuesTitle: {
    fontSize: 20,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  values: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  valueChip: {
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
  valueText: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
});
