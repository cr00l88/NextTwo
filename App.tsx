import { useFonts } from "expo-font";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useHabitsContext } from "./src/hooks/useHabitsContext";
import RootNavigator from "./src/navigation/RootNavigator";
import HabitsProvider from "./src/providers/HabitsProvider";
import ThemeProvider from "./src/providers/ThemeProvider";
import UserProvider from "./src/providers/UserProvider";

const customFonts = {
  "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
};

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <UserProvider>
          <ThemeProvider>
            <HabitsProvider>
              <RootNavigator />
            </HabitsProvider>
          </ThemeProvider>
        </UserProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
