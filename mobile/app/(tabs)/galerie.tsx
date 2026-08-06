import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fonts, radius, spacing } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import { gallery } from "@/lib/content";
import { getImage } from "@/lib/images";

const HEIGHT_VARIANTS = [180, 240, 210, 150, 260, 190];

export default function GalerieScreen() {
  const { colors } = useTheme();
  const { t } = useLocale();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const columns: (typeof gallery)[number][][] = [[], []];
  gallery.forEach((photo, i) => columns[i % 2].push(photo));

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingTop: insets.top + spacing.md, paddingBottom: 140 + insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.head}>
        <Text style={[styles.title, { color: colors.ink, fontFamily: fonts.display }]}>{t("gallery.title")}</Text>
        <Text style={[styles.subtitle, { color: colors.inkMuted, fontFamily: fonts.body }]}>
          {t("gallery.subtitle")}
        </Text>
      </View>

      <View style={styles.columns}>
        {columns.map((col, colIndex) => (
          <View key={colIndex} style={styles.column}>
            {col.map((photo, i) => (
              <Pressable
                key={photo.id}
                onPress={() => router.push(`/photo/${photo.id}`)}
                style={({ pressed }) => [
                  styles.tile,
                  {
                    height: HEIGHT_VARIANTS[(colIndex + i) % HEIGHT_VARIANTS.length],
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <Image source={getImage(photo.image)} style={StyleSheet.absoluteFillObject} contentFit="cover" transition={200} />
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  head: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 28,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  columns: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  column: {
    flex: 1,
    gap: spacing.sm,
  },
  tile: {
    borderRadius: radius.md,
    overflow: "hidden",
  },
});
