import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { fonts, radius, spacing } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import type { DishCategory } from "@/lib/types";

type CategoryItem = DishCategory | "evenementiel";

type Props<T extends CategoryItem> = {
  categories: T[];
  active?: T;
  onSelect: (category: T) => void;
};

export function CategoryBar<T extends CategoryItem>({ categories, active, onSelect }: Props<T>) {
  const { colors } = useTheme();
  const { t } = useLocale();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <Pressable
            key={cat}
            onPress={() => onSelect(cat)}
            style={[
              styles.pill,
              {
                backgroundColor: isActive ? colors.accent : colors.surface,
                borderColor: isActive ? colors.accent : colors.rule,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: isActive ? fonts.bodySemiBold : fonts.body,
                fontSize: 13,
                color: isActive ? colors.accentOn : colors.inkMuted,
              }}
            >
              {t(`categories.${cat}`)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  pill: {
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
  },
});
