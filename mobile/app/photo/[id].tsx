import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { radius, spacing } from "@/constants/theme";
import { gallery } from "@/lib/content";
import { getImage } from "@/lib/images";

export default function PhotoViewerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const photo = gallery.find((p) => p.id === id);

  return (
    <Pressable style={styles.backdrop} onPress={() => router.back()}>
      <View style={styles.imageWrap}>
        {photo && <Image source={getImage(photo.image)} style={StyleSheet.absoluteFillObject} contentFit="contain" transition={150} />}
      </View>
      <Pressable
        onPress={() => router.back()}
        style={[styles.close, { top: insets.top + spacing.md }]}
        hitSlop={12}
      >
        <Ionicons name="close" size={22} color="#F6F1E6" />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(10,16,13,0.94)",
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrap: {
    width: "100%",
    height: "72%",
  },
  close: {
    position: "absolute",
    right: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
});
