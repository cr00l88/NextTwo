import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { ITheme, THEME } from "../constants/theme";
import { useUserContext } from "../hooks/useUserContext";
import { getThemeData, storeThemeData } from "../storage/theme";
import { storeUserData, storeUserThemeMode } from "../storage/user";
import { TThemeMode } from "../types/themeMode";

interface IThemeContextState {
  mode: TThemeMode;
  theme: ITheme;
  onChangeMode: (newMode: TThemeMode) => void;
  onLoadTheme: () => void;
}

const initialState: IThemeContextState = {
  mode: "light",
  theme: THEME,
  onChangeMode: () => {},
  onLoadTheme: () => {},
};

export const ThemeContext = createContext<IThemeContextState>(initialState);

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<IThemeContextState>(initialState);
  const { themeMode } = useUserContext();

  useEffect(() => {
    onChangeMode(themeMode);
  }, []);

  const onChangeMode = async (newMode: TThemeMode) => {
    try {
      await storeThemeData(newMode);
      setState((prevState) => ({ ...prevState, mode: newMode }));
    } catch (error) {
      console.error(error);
    }
  };

  const onLoadTheme = async () => {
    try {
      const theme = await getThemeData();
      theme !== null ? onChangeMode(theme) : onChangeMode("light");
      console.log("[START]", "Loaded theme", theme);
    } catch (error) {
      console.error(error);
    }
  };

  const themeState: IThemeContextState = {
    mode: state.mode,
    theme: state.theme,
    onChangeMode,
    onLoadTheme,
  };

  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
