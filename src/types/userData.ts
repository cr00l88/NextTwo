import { TLanguage } from "./lang";
import { TThemeMode } from "./themeMode";

export interface IUserData {
  themeMode: TThemeMode;
  language: TLanguage;
  notifications: boolean;
}
