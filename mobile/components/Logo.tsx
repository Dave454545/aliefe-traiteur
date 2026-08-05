import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fonts } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { brand } from "@/lib/content";

type LogoSize = "sm" | "md" | "lg" | "xl";

const NAME_SIZE: Record<LogoSize, number> = { sm: 20, md: 28, lg: 40, xl: 56 };
const SLOGAN_SIZE: Record<LogoSize, number> = { sm: 9, md: 11, lg: 14, xl: 17 };
const RULE_WIDTH: Record<LogoSize, number> = { sm: 26, md: 34, lg: 46, xl: 60 };
const GAP: Record<LogoSize, number> = { sm: 2, md: 3, lg: 5, xl: 7 };

type Props = {
  size?: LogoSize;
  align?: "center" | "flex-start";
  onDark?: boolean; // force brass-on-dark styling regardless of active theme (e.g. over a photo)
};

export function Logo({ size = "md", align = "center", onDark }: Props) {
  const { colors, scheme } = useTheme();
  const useDarkTreatment = onDark ?? scheme === "dark";
  const nameColor = useDarkTreatment ? "#F1ECE0" : colors.ink;
  const sloganColor = useDarkTreatment ? colors.accentLight ?? "#D4B978" : colors.accent;
  const ruleColor = useDarkTreatment ? "#D4B978" : colors.accent;

  return (
    <View style={{ alignItems: align }}>
      <View style={[styles.rule, { width: RULE_WIDTH[size], backgroundColor: ruleColor, marginBottom: GAP[size] }]} />
      <Text
        style={{
          fontFamily: fonts.display,
          fontSize: NAME_SIZE[size],
          color: nameColor,
          letterSpacing: size === "xl" ? 2 : 1,
        }}
      >
        {brand.name}
      </Text>
      <Text
        style={{
          fontFamily: fonts.displayItalicRegular,
          fontSize: SLOGAN_SIZE[size],
          color: sloganColor,
          letterSpacing: 2.2,
          textTransform: "uppercase",
          marginTop: GAP[size],
        }}
      >
        {brand.slogan}
      </Text>
      <View style={[styles.rule, { width: RULE_WIDTH[size], backgroundColor: ruleColor, marginTop: GAP[size] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  rule: {
    height: 1,
    opacity: 0.7,
  },
});
