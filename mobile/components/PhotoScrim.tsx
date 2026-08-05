import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";

// A bottom-anchored fade so text stays legible without flattening the photo
// underneath it — the dish/event photography must stay the dominant element.
export function PhotoScrim({ heightRatio = 0.65 }: { heightRatio?: number }) {
  return (
    <LinearGradient
      colors={["transparent", "rgba(10,14,12,0.82)"]}
      locations={[0, 1]}
      style={[StyleSheet.absoluteFillObject, { top: `${(1 - heightRatio) * 100}%` }]}
      pointerEvents="none"
    />
  );
}
