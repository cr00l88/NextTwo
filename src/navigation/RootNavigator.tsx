import { useLayoutEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootNavigatorParamsList } from "../types/rootNavigator";

import { useHabitsContext } from "../hooks/useHabitsContext";
import { useThemeMode } from "../hooks/useThemeMode";
import { useTheme } from "../hooks/useTheme";

import HomeScreen from "../screens/HomeScreen";
import CreateHabitScreen from "../screens/CreateHabitScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HabitDetailsScreen from "../screens/HabitDetailsScreen";
import HabitActionSheetModal from "../screens/HabitActionSheetModal";
import SelectHabitIconModal from "../screens/SelectHabitIconModal";
import PomodoroScreen from "../screens/PomodoroScreen";

const RootStack = createNativeStackNavigator<RootNavigatorParamsList>();

const RootNavigator = () => {
  const { mode, onLoadTheme } = useThemeMode();
  const { onLoadHabits } = useHabitsContext();
  const { colors } = useTheme();

  useLayoutEffect(() => {
    onLoadTheme();
    onLoadHabits();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={mode === "light" ? colors.light.bg : colors.dark.bg}
        barStyle={mode === "light" ? "dark-content" : "light-content"}
      />
      <RootStack.Navigator>
        <RootStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="PomodoroScreen"
          component={PomodoroScreen}
          options={{
            headerShown: false,
            presentation: "fullScreenModal",
            animation: "fade",
          }}
        />

        <RootStack.Group
          screenOptions={{
            presentation: "modal",
            animation: "fade_from_bottom",
            headerShown: false,
          }}
        >
          <RootStack.Screen
            name="CreateHabitScreen"
            component={CreateHabitScreen}
            options={{ title: "Create a new habit" }}
          />
          <RootStack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ title: "Settings" }}
          />
          <RootStack.Screen
            name="HabitDetailsScreen"
            component={HabitDetailsScreen}
            options={{ title: "Habit" }}
          />
          <RootStack.Screen
            name="SelectHabitIconModal"
            component={SelectHabitIconModal}
            options={{ title: "Select icon" }}
          />
        </RootStack.Group>

        <RootStack.Group
          screenOptions={{
            presentation: "transparentModal",
            animation: "fade_from_bottom",
            headerShown: false,
          }}
        >
          <RootStack.Screen
            name="HabitActionSheetModal"
            component={HabitActionSheetModal}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
