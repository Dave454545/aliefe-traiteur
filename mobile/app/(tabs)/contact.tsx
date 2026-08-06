import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Logo } from "@/components/Logo";
import { fonts, radius, spacing } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import { brand } from "@/lib/content";
import { callPhone, openEmail, openFacebook, openInstagram, openWhatsapp } from "@/lib/contact";

export default function ContactScreen() {
  const { colors } = useTheme();
  const { t } = useLocale();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingTop: insets.top + spacing.lg, paddingBottom: 140 + insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <Logo size="md" />

      <View style={styles.head}>
        <Text style={[styles.title, { color: colors.ink, fontFamily: fonts.display }]}>{t("contact.title")}</Text>
        <Text style={[styles.subtitle, { color: colors.inkMuted, fontFamily: fonts.body }]}>
          {t("contact.subtitle")}
        </Text>
      </View>

      <View style={styles.ctaRow}>
        <Pressable
          onPress={callPhone}
          style={({ pressed }) => [styles.ctaButton, { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1 }]}
        >
          <Ionicons name="call" size={17} color={colors.accentOn} />
          <Text style={[styles.ctaText, { color: colors.accentOn }]}>{t("contact.call")}</Text>
        </Pressable>
        <Pressable
          onPress={() => openWhatsapp(t("contact.whatsappMessage"))}
          style={({ pressed }) => [
            styles.ctaButton,
            { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.rule, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Ionicons name="logo-whatsapp" size={17} color={colors.accent} />
          <Text style={[styles.ctaText, { color: colors.ink }]}>{t("contact.whatsapp")}</Text>
        </Pressable>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.rule }]}>
        <InfoRow icon="call-outline" label={t("contact.phoneLabel")} value={brand.phone} onPress={callPhone} />
        <Divider />
        <InfoRow icon="mail-outline" label={t("contact.emailLabel")} value={brand.email} onPress={openEmail} />
        <Divider />
        <InfoRow
          icon="location-outline"
          label={t("contact.addressLabel")}
          value={`${brand.city}, ${brand.country}`}
        />
      </View>

      {Platform.OS === "web" && (
        <Pressable
          onPress={() => router.push("/installer")}
          style={[styles.installRow, { backgroundColor: colors.surface, borderColor: colors.rule }]}
        >
          <View style={[styles.infoIcon, { backgroundColor: colors.surfaceAlt, borderColor: colors.rule }]}>
            <Ionicons name="download-outline" size={17} color={colors.accent} />
          </View>
          <Text style={[styles.installText, { color: colors.ink, fontFamily: fonts.bodyMedium }]}>
            {t("install.guideTitle")}
          </Text>
          <Ionicons name="chevron-forward" size={18} color={colors.inkFaint} />
        </Pressable>
      )}

      <View style={styles.social}>
        <Text style={[styles.socialLabel, { color: colors.inkMuted, fontFamily: fonts.bodySemiBold }]}>
          {t("contact.followUs")}
        </Text>
        <View style={styles.socialRow}>
          <Pressable
            onPress={openInstagram}
            style={[styles.socialButton, { backgroundColor: colors.surface, borderColor: colors.rule }]}
          >
            <Ionicons name="logo-instagram" size={17} color={colors.accent} />
            <Text style={[styles.socialText, { color: colors.ink, fontFamily: fonts.body }]}>
              {brand.instagram.handle}
            </Text>
          </Pressable>
          <Pressable
            onPress={openFacebook}
            style={[styles.socialButton, { backgroundColor: colors.surface, borderColor: colors.rule }]}
          >
            <Ionicons name="logo-facebook" size={17} color={colors.accent} />
            <Text style={[styles.socialText, { color: colors.ink, fontFamily: fonts.body }]}>
              {brand.facebook.handle}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

function InfoRow({
  icon,
  label,
  value,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: string;
  onPress?: () => void;
}) {
  const { colors } = useTheme();
  const Wrapper = onPress ? Pressable : View;
  return (
    <Wrapper onPress={onPress} style={styles.infoRow}>
      <View style={[styles.infoIcon, { backgroundColor: colors.surfaceAlt, borderColor: colors.rule }]}>
        <Ionicons name={icon} size={17} color={colors.accent} />
      </View>
      <View>
        <Text style={[styles.infoLabel, { color: colors.inkMuted, fontFamily: fonts.body }]}>{label}</Text>
        <Text style={[styles.infoValue, { color: colors.ink, fontFamily: fonts.bodyMedium }]}>{value}</Text>
      </View>
    </Wrapper>
  );
}

function Divider() {
  const { colors } = useTheme();
  return <View style={{ height: 1, backgroundColor: colors.rule }} />;
}

const styles = StyleSheet.create({
  head: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
    maxWidth: 280,
  },
  ctaRow: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  ctaButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: radius.pill,
    paddingVertical: 13,
  },
  ctaText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13.5,
  },
  card: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  infoValue: {
    fontSize: 14.5,
    marginTop: 2,
  },
  installRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.sm,
  },
  installText: {
    flex: 1,
    fontSize: 13.5,
  },
  social: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  socialLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  socialRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: 10,
    paddingHorizontal: spacing.sm,
  },
  socialText: {
    fontSize: 12,
  },
});
