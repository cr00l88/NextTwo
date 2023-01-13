import { TLanguage } from "../types/lang";
import { TThemeMode } from "../types/themeMode";
import { getJSONData, storeJSONData } from "./storage";

const KEY = "@user";

interface IUserData {
  themeMode: TThemeMode;
  language: TLanguage;
  notification: boolean;
}

export const storeUserData = async (user: IUserData) => {
  try {
    await storeJSONData(KEY, user);
  } catch (error) {
    console.error(error);
  }
};

export const getUserData = async () => {
  try {
    const data = (await getJSONData(KEY)) as IUserData;
    if (data !== null) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};
