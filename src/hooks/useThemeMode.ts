import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

export const useThemeMode = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme was used outside of its Provider");
  }

  return {
    mode: context.mode,
    onChangeMode: context.onChangeMode,
    onLoadTheme: context.onLoadTheme,
  };
};
