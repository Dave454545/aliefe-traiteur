import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CategoryBar } from "@/components/CategoryBar";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { HeaderControls } from "@/components/HeaderControls";
import { Logo } from "@/components/Logo";
import { PhotoScrim } from "@/components/PhotoScrim";
import { SearchBar } from "@/components/SearchBar";
import { fonts, radius, spacing } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import { getImage } from "@/lib/images";
import { getSignatureDishes } from "@/lib/content";
import type { DishCategory } from "@/lib/types";

const CATEGORIES: (DishCategory | "evenementiel")[] = ["entrees", "plats", "boissons", "desserts", "evenementiel"];

export default function HomeScreen() {
  const { colors } = useTheme();
  const { t } = useLocale();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const signature = getSignatureDishes();

  const handleSearch = (q: string) => {
    if (q.trim().length === 0) return;
    router.push({ pathname: "/menu", params: { q } });
  };

  const handleCategory = (cat: DishCategory | "evenementiel") => {
    if (cat === "evenementiel") router.push("/evenementiel");
    else router.push({ pathname: "/menu", params: { cat } });
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingTop: insets.top + spacing.sm, paddingBottom: 140 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <Logo size="sm" align="flex-start" />
        <HeaderControls />
      </View>

      <View style={styles.heroText}>
        <Text style={[styles.eyebrow, { color: colors.accent, fontFamily: fonts.bodySemiBold }]}>
          {t("home.eyebrow")}
        </Text>
        <Text style={[styles.baseline, { color: colors.ink, fontFamily: fonts.display }]}>
          {t("home.heroBaseline")}
        </Text>
        <Text style={[styles.heroParagraph, { color: colors.inkMuted, fontFamily: fonts.body }]}>
          {t("home.heroText")}
        </Text>
      </View>

      <View style={styles.searchWrap}>
        <SearchBar value={""} onChangeText={() => {}} />
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/menu")}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      <View style={{ marginTop: spacing.lg }}>
        <CategoryBar categories={CATEGORIES} onSelect={handleCategory} />
      </View>

      <View style={styles.section}>
        <SectionHead title={t("home.featuredTitle")} subtitle={t("home.featuredSubtitle")} />
        <View style={{ marginTop: spacing.md }}>
          <FeaturedCarousel dishes={signature} />
        </View>
      </View>

      <View style={styles.section}>
        <Pressable onPress={() => router.push("/evenementiel")} style={styles.eventsCard}>
          <Image source={getImage("2")} style={StyleSheet.absoluteFillObject} contentFit="cover" />
          <PhotoScrim heightRatio={0.75} />
          <View style={styles.eventsCardBody}>
            <Text style={[styles.cardEyebrow]}>{t("categories.evenementiel")}</Text>
            <Text style={styles.cardTitle}>{t("home.eventsTitle")}</Text>
            <Text style={styles.cardText}>{t("home.eventsText")}</Text>
            <View style={[styles.cta, { backgroundColor: colors.accent, alignSelf: "flex-start" }]}>
              <Text style={{ color: colors.accentOn, fontFamily: fonts.bodySemiBold, fontSize: 13 }}>
                {t("home.eventsCta")}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Pressable
          onPress={() => router.push("/a-propos")}
          style={[styles.aboutCard, { backgroundColor: colors.surface, borderColor: colors.rule }]}
        >
          <Image source={getImage("7")} style={styles.aboutImage} contentFit="cover" />
          <View style={styles.aboutBody}>
            <Text style={[styles.cardTitleDark, { color: colors.ink, fontFamily: fonts.display }]}>
              {t("home.aboutTeaserTitle")}
            </Text>
            <Text style={[styles.cardTextDark, { color: colors.inkMuted, fontFamily: fonts.body }]} numberOfLines={3}>
              {t("home.aboutTeaserText")}
            </Text>
            <Text style={[styles.link, { color: colors.accent, fontFamily: fonts.bodySemiBold }]}>
              {t("home.aboutTeaserCta")} →
            </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function SectionHead({ title, subtitle }: { title: string; subtitle: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ paddingHorizontal: spacing.lg }}>
      <Text style={[styles.sectionEyebrow, { color: colors.accent, fontFamily: fonts.bodySemiBold }]}>{title}</Text>
      <Text style={[styles.sectionTitle, { color: colors.ink, fontFamily: fonts.display }]}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: spacing.lg,
  },
  heroText: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    marginBottom: spacing.sm,
  },
  baseline: {
    fontSize: 34,
    lineHeight: 38,
  },
  heroParagraph: {
    fontSize: 14.5,
    lineHeight: 21,
    marginTop: spacing.sm,
    maxWidth: 320,
  },
  searchWrap: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  section: {
    marginTop: spacing.xxl,
  },
  sectionEyebrow: {
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 24,
  },
  eventsCard: {
    marginHorizontal: spacing.lg,
    height: 210,
    borderRadius: radius.xl,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  eventsCardBody: {
    padding: spacing.lg,
    gap: 6,
  },
  cardEyebrow: {
    fontFamily: fonts.body,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: "#D4B978",
  },
  cardTitle: {
    fontFamily: fonts.display,
    fontSize: 26,
    color: "#F6F1E6",
  },
  cardText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: "#E4DDCB",
    maxWidth: 260,
    marginBottom: spacing.sm,
  },
  cta: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  aboutCard: {
    marginHorizontal: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "row",
  },
  aboutImage: {
    width: 110,
  },
  aboutBody: {
    flex: 1,
    padding: spacing.md,
    gap: 4,
    justifyContent: "center",
  },
  cardTitleDark: {
    fontSize: 19,
  },
  cardTextDark: {
    fontSize: 12.5,
    lineHeight: 17,
  },
  link: {
    fontSize: 12.5,
    marginTop: 4,
  },
});
