import React, { createContext, PropsWithChildren, useState } from "react";
import { ITheme, THEME } from "../constants/theme";

interface IThemeContextState {
  theme: ITheme;
  onChangeTheme: () => void;
}

const initialState: IThemeContextState = {
  theme: THEME,
  onChangeTheme: () => {},
};

export const ThemeContext = createContext<IThemeContextState>(initialState);

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<IThemeContextState>(initialState);

  const onChangeTheme = () => {
    // setState((prevState) => ({ ...prevState, theme }));
  };

  const themeState: IThemeContextState = {
    theme: state.theme,
    onChangeTheme,
  };

  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
