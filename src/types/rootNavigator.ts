import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNavigatorParamsList = {
  HomeScreen: undefined;
  CreateHabitScreen: undefined;
  SettingsScreen: undefined;
  HabitDetailsScreen: { id: string };
  HabitActionSheetModal: { id: string };
  SelectHabitIconModal: { id: string };
  PomodoroScreen: { id: string };
};

export type RootStackScreenProps<T extends keyof RootNavigatorParamsList> =
  NativeStackScreenProps<RootNavigatorParamsList, T>;
