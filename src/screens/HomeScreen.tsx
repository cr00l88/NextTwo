import { useEffect } from "react";
import { RootStackScreenProps } from "../types/rootNavigator";
import { Block, Text, Button } from "../components";
import { useHabitsContext } from "../hooks/useHabitsContext";
import HomeNavbar from "../components/HomeNavbar";
import HabitRow from "../components/HabitRow";
import { FlatList } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useThemeMode } from "../hooks/useThemeMode";
import { useTheme } from "../hooks/useTheme";

const HomeScreen: React.FC<RootStackScreenProps<"HomeScreen">> = ({
  navigation,
}) => {
  const { habits, getHabit } = useHabitsContext();
  const { colors } = useTheme();
  const { mode } = useThemeMode();

  const renderItem = ({ item }) => (
    <HabitRow
      key={item.id}
      habit={item}
      onPressRow={() => onNavigateToDetailes(item.id)}
      onPressMoreOptions={() => {
        getHabit(item.id);
        navigation.navigate("HabitActionSheetModal", { id: item.id });
      }}
    />
  );

  const onNavigateToDetailes = (id: string) => {
    getHabit(id);
    navigation.navigate("HabitDetailsScreen", { id });
  };

  return (
    <Block safe flex={1} color={colors[mode].bg}>
      <HomeNavbar
        onPressSettings={() => navigation.navigate("SettingsScreen")}
        onPressCreate={() => navigation.navigate("CreateHabitScreen")}
      />
      <Block paddingHorizontal={16}>
        {/* <PrimaryButton
          title="Go to pomodore"
          onPress={() => navigation.navigate("PomodoroScreen", { id: "1234" })}
        /> */}

        <FlatList
          data={habits}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 64 }}
          ListEmptyComponent={() => (
            <Text h4 margin={8} color="gray" align="center">
              No habit here
            </Text>
          )}
        />
      </Block>
    </Block>
  );
};

export default HomeScreen;
