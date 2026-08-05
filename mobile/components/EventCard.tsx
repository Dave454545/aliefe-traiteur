import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PhotoScrim } from "@/components/PhotoScrim";
import { fonts, radius, spacing } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import { openWhatsapp } from "@/lib/contact";
import { getImage } from "@/lib/images";
import type { EventPackage } from "@/lib/types";

export function EventCard({ event }: { event: EventPackage }) {
  const { colors } = useTheme();
  const { t, locale } = useLocale();

  const requestQuote = () => {
    openWhatsapp(t("events.whatsappMessage", { event: event.name[locale] }));
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.rule }]}>
      <View style={styles.imageWrap}>
        <Image source={getImage(event.image)} style={StyleSheet.absoluteFillObject} contentFit="cover" transition={200} />
        <PhotoScrim heightRatio={0.7} />
        {event.highlight && (
          <View style={[styles.badge, { backgroundColor: colors.accent }]}>
            <Text style={[styles.badgeText, { color: colors.accentOn }]}>
              {locale === "fr" ? "Le plus demandé" : "Most requested"}
            </Text>
          </View>
        )}
        <Text style={styles.imageTitle}>{event.name[locale]}</Text>
      </View>

      <View style={styles.body}>
        <Text style={[styles.desc, { color: colors.inkMuted, fontFamily: fonts.body }]}>{event.description[locale]}</Text>

        <View style={styles.features}>
          {event.features[locale].map((f) => (
            <View key={f} style={styles.featureRow}>
              <View style={[styles.dot, { backgroundColor: colors.accent }]} />
              <Text style={[styles.featureText, { color: colors.ink, fontFamily: fonts.body }]}>{f}</Text>
            </View>
          ))}
        </View>

        <Pressable
          onPress={requestQuote}
          style={({ pressed }) => [styles.cta, { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1 }]}
        >
          <Text style={[styles.ctaText, { color: colors.accentOn }]}>{t("events.requestQuote")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    borderWidth: 1,
    overflow: "hidden",
  },
  imageWrap: {
    height: 170,
    justifyContent: "flex-end",
    padding: spacing.md,
  },
  imageTitle: {
    fontFamily: fonts.display,
    fontSize: 26,
    color: "#F6F1E6",
  },
  badge: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  badgeText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  body: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  desc: {
    fontSize: 13.5,
    lineHeight: 19,
  },
  features: {
    gap: 8,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  featureText: {
    fontSize: 13,
  },
  cta: {
    borderRadius: radius.pill,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: spacing.xs,
  },
  ctaText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    letterSpacing: 0.3,
  },
});
