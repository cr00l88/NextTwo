import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootNavigatorParamsList } from "../types/rootNavigator";

import HomeScreen from "../screens/HomeScreen";
import CreateHabitScreen from "../screens/CreateHabitScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HabitDetailsScreen from "../screens/HabitDetailsScreen";
import HabitActionSheetModal from "../screens/HabitActionSheetModal";

const RootStack = createNativeStackNavigator<RootNavigatorParamsList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
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
