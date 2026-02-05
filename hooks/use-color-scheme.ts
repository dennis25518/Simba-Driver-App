import { ThemeContext } from "@/context/theme";
import { useContext } from "react";
import { useColorScheme as useNativeColorScheme } from "react-native";

export const useColorScheme = () => {
  const themeContext = useContext(ThemeContext);
  const nativeColorScheme = useNativeColorScheme();

  // If theme context exists (custom theme toggle), use it
  if (themeContext) {
    return themeContext.themeMode;
  }

  // Otherwise use native color scheme
  return nativeColorScheme ?? "light";
};
