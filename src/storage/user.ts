import { useUserContext } from "../hooks/useUserContext";
import { TThemeMode } from "../types/themeMode";
import { IUserData } from "../types/userData";
import { getJSONData, storeJSONData } from "./storage";

const KEY = "@user";

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

export const storeUserThemeMode = async (newMode: TThemeMode) => {
  try {
    const { language, notifications } = useUserContext();

    await storeUserData({
      themeMode: newMode,
      language,
      notifications,
    });
  } catch (error) {
    console.error(error);
  }
};
