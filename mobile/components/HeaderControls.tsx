import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { fonts, radius, spacing } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";

export function HeaderControls() {
  const { colors, scheme, toggleScheme } = useTheme();
  const { locale, setLocale } = useLocale();

  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => setLocale(locale === "fr" ? "en" : "fr")}
        style={[styles.button, { backgroundColor: colors.surface, borderColor: colors.rule }]}
      >
        <Text style={[styles.langText, { color: colors.ink, fontFamily: fonts.bodySemiBold }]}>
          {locale.toUpperCase()}
        </Text>
      </Pressable>
      <Pressable
        onPress={toggleScheme}
        style={[styles.button, { backgroundColor: colors.surface, borderColor: colors.rule }]}
      >
        <Ionicons name={scheme === "dark" ? "sunny-outline" : "moon-outline"} size={16} color={colors.ink} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  langText: {
    fontSize: 11,
    letterSpacing: 0.3,
  },
});
