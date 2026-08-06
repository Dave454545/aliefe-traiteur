import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CategoryBar } from "@/components/CategoryBar";
import { DishCard } from "@/components/DishCard";
import { SearchBar } from "@/components/SearchBar";
import { fonts, spacing } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import { dishCategories, getDishesByCategory, searchDishes } from "@/lib/content";
import type { DishCategory } from "@/lib/types";

export default function MenuScreen() {
  const { colors } = useTheme();
  const { t, locale } = useLocale();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ q?: string; cat?: string }>();

  const [query, setQuery] = useState(params.q ?? "");
  const scrollRef = useRef<ScrollView>(null);
  const sectionY = useRef<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<DishCategory>(
    (params.cat as DishCategory) ?? "entrees"
  );

  useEffect(() => {
    if (params.q) setQuery(params.q);
  }, [params.q]);

  useEffect(() => {
    if (params.cat) {
      const target = sectionY.current[params.cat];
      if (target !== undefined) {
        scrollRef.current?.scrollTo({ y: Math.max(target - 96, 0), animated: true });
      }
    }
  }, [params.cat]);

  const searchResults = useMemo(() => (query.trim() ? searchDishes(query, locale) : []), [query, locale]);
  const isSearching = query.trim().length > 0;

  const scrollToCategory = (cat: DishCategory) => {
    setActiveCategory(cat);
    const target = sectionY.current[cat];
    if (target !== undefined) {
      scrollRef.current?.scrollTo({ y: Math.max(target - 96, 0), animated: true });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        ref={scrollRef}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + spacing.md, paddingBottom: 140 + insets.bottom }}
      >
        <View style={styles.headBlock}>
          <Text style={[styles.title, { color: colors.ink, fontFamily: fonts.display }]}>{t("menu.title")}</Text>
          <Text style={[styles.subtitle, { color: colors.inkMuted, fontFamily: fonts.body }]}>
            {t("menu.subtitle")}
          </Text>
          <View style={{ marginTop: spacing.md }}>
            <SearchBar value={query} onChangeText={setQuery} />
          </View>
        </View>

        {!isSearching && (
          <View style={[styles.stickyBar, { backgroundColor: colors.bg }]}>
            <CategoryBar categories={dishCategories} active={activeCategory} onSelect={scrollToCategory} />
          </View>
        )}

        {isSearching ? (
          <View style={[styles.grid, { paddingHorizontal: spacing.lg, marginTop: spacing.lg }]}>
            {searchResults.length === 0 ? (
              <Text style={[styles.empty, { color: colors.inkMuted, fontFamily: fonts.body }]}>
                {t("common.noResults")}
              </Text>
            ) : (
              searchResults.map((dish) => (
                <View key={dish.id} style={styles.gridItem}>
                  <DishCard dish={dish} />
                </View>
              ))
            )}
          </View>
        ) : (
          dishCategories.map((cat) => (
            <View
              key={cat}
              onLayout={(e) => {
                sectionY.current[cat] = e.nativeEvent.layout.y;
              }}
              style={styles.categorySection}
            >
              <Text style={[styles.categoryTitle, { color: colors.ink, fontFamily: fonts.display }]}>
                {t(`categories.${cat}`)}
              </Text>
              <View style={styles.grid}>
                {getDishesByCategory(cat).map((dish) => (
                  <View key={dish.id} style={styles.gridItem}>
                    <DishCard dish={dish} />
                  </View>
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headBlock: {
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: 28,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  stickyBar: {
    paddingVertical: spacing.sm,
  },
  categorySection: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  categoryTitle: {
    fontSize: 21,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  gridItem: {
    width: "47%",
  },
  empty: {
    fontSize: 13.5,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
});
