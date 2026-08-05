import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { fonts, radius, spacing } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import { getImage } from "@/lib/images";
import type { Dish } from "@/lib/types";
import { Tag } from "./Tag";

export function DishCard({ dish }: { dish: Dish }) {
  const { colors } = useTheme();
  const { locale } = useLocale();
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/plat/${dish.id}`)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.rule, transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
    >
      <Image source={getImage(dish.image)} style={styles.image} contentFit="cover" transition={200} />
      <View style={styles.body}>
        <Text style={[styles.name, { color: colors.ink, fontFamily: fonts.display }]} numberOfLines={1}>
          {dish.name[locale]}
        </Text>
        <Text style={[styles.desc, { color: colors.inkMuted, fontFamily: fonts.body }]} numberOfLines={2}>
          {dish.description[locale]}
        </Text>
        {dish.tags.length > 0 && (
          <View style={styles.tags}>
            {dish.tags.map((tag) => (
              <Tag key={tag} code={tag} />
            ))}
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 1.15,
  },
  body: {
    padding: spacing.md,
    gap: 4,
  },
  name: {
    fontSize: 17,
  },
  desc: {
    fontSize: 12,
    lineHeight: 16,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
  },
});
