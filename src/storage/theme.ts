import { getJSONData, storeJSONData } from "./storage";
import { TThemeMode } from "../types/themeMode";

const KEY = "@theme";

export const storeThemeData = async (theme: TThemeMode) => {
  try {
    await storeJSONData(KEY, theme);
  } catch (error) {
    console.error(error);
  }
};

export const getThemeData = async () => {
  try {
    const data = (await getJSONData(KEY)) as TThemeMode;
    if (data !== null) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};
