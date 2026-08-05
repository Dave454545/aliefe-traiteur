import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { fonts, radius, spacing } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";

type Props = {
  value: string;
  onChangeText: (value: string) => void;
};

export function SearchBar({ value, onChangeText }: Props) {
  const { colors } = useTheme();
  const { t } = useLocale();

  return (
    <View style={[styles.wrap, { backgroundColor: colors.surface, borderColor: colors.rule }]}>
      <Ionicons name="search" size={17} color={colors.inkFaint} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={t("common.search")}
        placeholderTextColor={colors.inkFaint}
        style={[styles.input, { color: colors.ink, fontFamily: fonts.body }]}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Ionicons
          name="close-circle"
          size={17}
          color={colors.inkFaint}
          onPress={() => onChangeText("")}
          suppressHighlighting
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    height: 46,
  },
  input: {
    flex: 1,
    fontSize: 14.5,
  },
});
