import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

export const useThemeStyles = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme was used outside of its Provider");
  }

  return context.theme;
};
