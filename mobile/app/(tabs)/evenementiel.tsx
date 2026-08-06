import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EventCard } from "@/components/EventCard";
import { fonts, spacing } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import { events } from "@/lib/content";

export default function EvenementielScreen() {
  const { colors } = useTheme();
  const { t } = useLocale();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingTop: insets.top + spacing.md, paddingBottom: 140 + insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.head}>
        <Text style={[styles.title, { color: colors.ink, fontFamily: fonts.display }]}>{t("events.title")}</Text>
        <Text style={[styles.subtitle, { color: colors.inkMuted, fontFamily: fonts.body }]}>
          {t("events.subtitle")}
        </Text>
      </View>

      <View style={styles.list}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  head: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 28,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
    maxWidth: 300,
  },
  list: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
});
