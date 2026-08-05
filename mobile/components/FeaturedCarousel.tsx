import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { PhotoScrim } from "@/components/PhotoScrim";
import { fonts, radius, spacing } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import { getImage } from "@/lib/images";
import type { Dish } from "@/lib/types";

const { width } = Dimensions.get("window");
const CARD_WIDTH = Math.min(width * 0.72, 300);

export function FeaturedCarousel({ dishes }: { dishes: Dish[] }) {
  const { locale } = useLocale();
  const router = useRouter();

  return (
    <FlatList
      data={dishes}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      snapToInterval={CARD_WIDTH + spacing.md}
      decelerationRate="fast"
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/plat/${item.id}`)}
          style={({ pressed }) => [styles.card, { width: CARD_WIDTH, transform: [{ scale: pressed ? 0.97 : 1 }] }]}
        >
          <Image source={getImage(item.image)} style={styles.image} contentFit="cover" transition={250} />
          <PhotoScrim heightRatio={0.55} />
          <View style={styles.textWrap}>
            <Text style={styles.eyebrow}>{locale === "fr" ? "Signature" : "Signature dish"}</Text>
            <Text style={styles.name} numberOfLines={1}>
              {item.name[locale]}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  card: {
    height: 200,
    borderRadius: radius.xl,
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  textWrap: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
  },
  eyebrow: {
    fontFamily: fonts.body,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: "#D4B978",
    marginBottom: 2,
  },
  name: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: "#F6F1E6",
  },
});
