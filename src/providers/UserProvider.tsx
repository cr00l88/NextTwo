import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { getUserData, storeUserData } from "../storage/user";
import { TLanguage } from "../types/lang";
import { TThemeMode } from "../types/themeMode";
import { IUserData } from "../types/userData";

interface IUserContextState {
  themeMode: TThemeMode;
  language: TLanguage;
  notifications: boolean;
  onChangeMode: (colorMode: TThemeMode) => void;
  onChangeLang: (lang: TLanguage) => void;
}

const initialState: IUserContextState = {
  themeMode: "light",
  language: "EN",
  notifications: false,
  onChangeMode: () => {},
  onChangeLang: () => {},
};

export const UserContext = createContext<IUserContextState>(initialState);

const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<IUserContextState>(initialState);

  const updateUserState = (user: IUserData) => {
    setState((prevState) => ({
      ...prevState,
      themeMode: user.themeMode,
      language: user.language,
      notifications: user.notifications,
    }));
  };

  // const readUserData = async () => {
  //   try {
  //     const userData = await getUserData();
  //     if (userData !== null) {
  //       updateUserState(userData);
  //     } else {
  //       await storeUserData(initialState);
  //       updateUserState(initialState);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onChangeMode = (colorMode: TThemeMode) => {
    setState((prevState) => ({ ...prevState, colorMode }));
  };

  const onChangeLang = (lang: TLanguage) => {
    setState((prevState) => ({ ...prevState, language: lang }));
  };

  const userState: IUserContextState = {
    themeMode: state.themeMode,
    language: state.language,
    notifications: state.notifications,
    onChangeMode,
    onChangeLang,
  };

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
