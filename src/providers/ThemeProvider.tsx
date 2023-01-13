import React, { createContext, PropsWithChildren, useState } from "react";
import { ITheme, THEME } from "../constants/theme";
import { TThemeMode } from "../types/themeMode";

interface IThemeContextState {
  mode: TThemeMode;
  theme: ITheme;
  onChangeMode: (newMode: TThemeMode) => void;
}

const initialState: IThemeContextState = {
  mode: "light",
  theme: THEME,
  onChangeMode: () => {},
};

export const ThemeContext = createContext<IThemeContextState>(initialState);

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<IThemeContextState>(initialState);

  const onChangeMode = (newMode: TThemeMode) => {
    setState((prevState) => ({ ...prevState, mode: newMode }));
  };

  const themeState: IThemeContextState = {
    mode: state.mode,
    theme: state.theme,
    onChangeMode,
  };

  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
