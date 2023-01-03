import React, { createContext, PropsWithChildren, useState } from "react";
import { TColorMode } from "../types/colorMode";
import { TLanguage } from "../types/lang";

interface IUserContextState {
  colorMode: TColorMode;
  language: TLanguage;
  notifications: boolean;
  onChangeMode: (colorMode: TColorMode) => void;
  onChangeLang: (lang: TLanguage) => void;
}

const initialState: IUserContextState = {
  colorMode: "Auto",
  language: "EN",
  notifications: false,
  onChangeMode: () => {},
  onChangeLang: () => {},
};

export const UserContext = createContext<IUserContextState>(initialState);

const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<IUserContextState>(initialState);

  const onChangeMode = (colorMode: TColorMode) => {
    setState((prevState) => ({ ...prevState, colorMode }));
  };

  const onChangeLang = (lang: TLanguage) => {
    setState((prevState) => ({ ...prevState, language: lang }));
  };

  const userState: IUserContextState = {
    colorMode: state.colorMode,
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
