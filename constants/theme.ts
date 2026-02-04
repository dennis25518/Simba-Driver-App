/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

// Primary action color (green)
const primaryColor = "#4CAF50";
const primaryLightColor = "#81C784";

// Secondary action colors
const secondaryBlue = "#2196F3";
const secondaryOrange = "#FF9800";
const dangerRed = "#FF6B6B";

// Card and background colors
const cardBackgroundLight = "#f8f8f8";
const cardBackgroundDark = "#1a1a2e";
const headerBackgroundLight = "#f5f5f51a";
const headerBackgroundDark = "#1a1a2e1a";

const tintColorLight = primaryColor;
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    // Sidebar/Card colors
    cardBackground: cardBackgroundLight,
    headerBackground: headerBackgroundLight,
    primary: primaryColor,
    primaryLight: primaryLightColor,
    secondary: secondaryBlue,
    warning: secondaryOrange,
    danger: dangerRed,
    divider: "rgba(0,0,0,0.1)",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    // Sidebar/Card colors
    cardBackground: cardBackgroundDark,
    headerBackground: headerBackgroundDark,
    primary: primaryColor,
    primaryLight: primaryLightColor,
    secondary: secondaryBlue,
    warning: secondaryOrange,
    danger: dangerRed,
    divider: "rgba(255,255,255,0.1)",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
