import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tag } from "@/components/Tag";
import { fonts, radius, spacing } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import { callPhone, openWhatsapp } from "@/lib/contact";
import { getDishById } from "@/lib/content";
import { getImage } from "@/lib/images";

export default function DishDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const { t, locale } = useLocale();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const dish = getDishById(id);
  if (!dish) {
    router.back();
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 140 }}>
        <View style={styles.imageWrap}>
          <Image source={getImage(dish.image)} style={StyleSheet.absoluteFillObject} contentFit="cover" transition={200} />
          <View style={[styles.imageShade, { backgroundColor: colors.overlay }]} />
          <Pressable
            onPress={() => router.back()}
            style={[styles.backButton, { top: insets.top + spacing.sm, backgroundColor: "rgba(20,32,27,0.55)" }]}
          >
            <Ionicons name="close" size={20} color="#F6F1E6" />
          </Pressable>
        </View>

        <View style={styles.body}>
          <Text style={[styles.name, { color: colors.ink, fontFamily: fonts.display }]}>{dish.name[locale]}</Text>

          {dish.tags.length > 0 && (
            <View style={styles.tagsRow}>
              {dish.tags.map((tag) => (
                <Tag key={tag} code={tag} />
              ))}
            </View>
          )}

          <Text style={[styles.sectionLabel, { color: colors.accent, fontFamily: fonts.bodySemiBold }]}>
            {t("dish.descriptionLabel")}
          </Text>
          <Text style={[styles.description, { color: colors.inkMuted, fontFamily: fonts.body }]}>
            {dish.description[locale]}
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.ctaBar, { backgroundColor: colors.surface, borderColor: colors.rule, paddingBottom: insets.bottom + spacing.md }]}>
        <Pressable
          onPress={callPhone}
          style={({ pressed }) => [
            styles.ctaButton,
            { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.rule, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Ionicons name="call" size={16} color={colors.accent} />
          <Text style={[styles.ctaText, { color: colors.ink }]}>{t("dish.orderCall")}</Text>
        </Pressable>
        <Pressable
          onPress={() => openWhatsapp(t("dish.whatsappMessage", { dish: dish.name[locale] }))}
          style={({ pressed }) => [styles.ctaButton, { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1 }]}
        >
          <Ionicons name="logo-whatsapp" size={16} color={colors.accentOn} />
          <Text style={[styles.ctaText, { color: colors.accentOn }]}>{t("dish.orderWhatsapp")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrap: {
    height: 360,
  },
  imageShade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
  },
  backButton: {
    position: "absolute",
    left: spacing.lg,
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    padding: spacing.lg,
  },
  name: {
    fontSize: 30,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: spacing.sm,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
  },
  ctaBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: spacing.sm,
    borderTopWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  ctaButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    borderRadius: radius.pill,
    paddingVertical: 13,
  },
  ctaText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
  },
});
