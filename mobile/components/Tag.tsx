import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fonts, radius } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";

const SPICY_TAGS = new Set(["spicy"]);
const VEG_TAGS = new Set(["vegetarian"]);

export function Tag({ code }: { code: string }) {
  const { colors } = useTheme();
  const { t } = useLocale();
  const isSpicy = SPICY_TAGS.has(code);
  const isVeg = VEG_TAGS.has(code);
  const color = isSpicy ? colors.spicy : isVeg ? colors.veg : colors.inkMuted;
  const borderColor = isSpicy ? colors.spicy : isVeg ? colors.veg : colors.ruleStrong;

  return (
    <View style={[styles.tag, { borderColor, opacity: 0.9 }]}>
      <Text style={[styles.label, { color, fontFamily: fonts.body }]}>{t(`tags.${code}`)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
  },
  label: {
    fontSize: 10.5,
    letterSpacing: 0.3,
  },
});
