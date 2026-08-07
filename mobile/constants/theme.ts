// Direction B — "Nuit d'Abidjan" : vert-nuit profond + laiton, feutré et haut de gamme.

export const fonts = {
  display: "CormorantGaramond_600SemiBold",
  displayBold: "CormorantGaramond_700Bold",
  displayItalic: "CormorantGaramond_600SemiBold_Italic",
  displayItalicRegular: "CormorantGaramond_500Medium_Italic",
  body: "Jost_400Regular",
  bodyMedium: "Jost_500Medium",
  bodySemiBold: "Jost_600SemiBold",
};

export type Palette = {
  bg: string;
  surface: string;
  surfaceAlt: string;
  ink: string;
  inkMuted: string;
  inkFaint: string;
  accent: string;
  accentLight: string;
  accentOn: string; // text color placed on top of an accent-filled surface
  rule: string;
  ruleStrong: string;
  spicy: string;
  spicyBg: string;
  veg: string;
  vegBg: string;
  overlay: string;
  shadow: string;
};

const dark: Palette = {
  bg: "#14201B",
  surface: "#1C2B24",
  surfaceAlt: "#22342B",
  ink: "#F1ECE0",
  inkMuted: "#9CA79C",
  inkFaint: "#6E7A70",
  accent: "#B99356",
  accentLight: "#D4B978",
  accentOn: "#14201B",
  rule: "#2C3A32",
  ruleStrong: "#3B4C41",
  spicy: "#D08063",
  spicyBg: "#3A2A20",
  veg: "#93B08A",
  vegBg: "#233327",
  overlay: "rgba(10,16,13,0.72)",
  shadow: "rgba(0,0,0,0.45)",
};

const light: Palette = {
  bg: "#F6F1E6",
  surface: "#FFFFFE",
  surfaceAlt: "#EDE5D3",
  ink: "#1B241E",
  inkMuted: "#5B6459",
  inkFaint: "#8A9186",
  accent: "#8C6B34",
  accentLight: "#B99356",
  accentOn: "#FFFFFE",
  rule: "#E1D8C3",
  ruleStrong: "#CBBE9F",
  spicy: "#A8492E",
  spicyBg: "#F2E1D8",
  veg: "#4B6B49",
  vegBg: "#E3EBDF",
  overlay: "rgba(20,32,27,0.6)",
  shadow: "rgba(27,36,30,0.18)",
};

export const palettes = { dark, light };

export const radius = {
  sm: 8,
  md: 14,
  lg: 22,
  xl: 32,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Base (non-safe-area) content height of the bottom tab bar. Actual on-screen
// height is this plus the device's bottom safe-area inset, computed where the
// tab bar and anything anchored above it (FAB, scroll padding) are laid out.
export const TAB_BAR_HEIGHT = 56;

// Web/PWA only: how much of the bottom safe-area inset the tab bar reserves.
// iOS reports 34px for the home indicator, but reserving all of it left ~46px
// of dead space under the labels and read as a bulky bar. 20px still clears the
// indicator pill (which sits within the bottom ~21px) without the bulk. Shared
// with the floating button so it tracks the bar's real height.
export const SAFE_AREA_BOTTOM_CSS = "min(env(safe-area-inset-bottom), 20px)";
