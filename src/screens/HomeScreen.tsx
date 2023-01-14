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
  const { habits, getAllHabits, getHabit, onDeleteAllHabits, onUpdateHabits } =
    useHabitsContext();
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
        <Button
          hitSlopArea
          color="black"
          radius={4}
          paddingVertical={8}
          paddingHorizontal={16}
          marginVertical={8}
          onPress={() => navigation.navigate("PomodoroScreen", { id: "1234" })}
        >
          <Text body color="white" align="center">
            Go to pomodore
          </Text>
        </Button>

        <Button
          hitSlopArea
          color="crimson"
          radius={4}
          paddingVertical={8}
          paddingHorizontal={16}
          marginVertical={8}
          onPress={() => onDeleteAllHabits()}
        >
          <Text color="white" align="center">
            Delete all habits
          </Text>
        </Button>

        <Button
          hitSlopArea
          center
          color="#D2691E"
          radius={4}
          paddingVertical={8}
          paddingHorizontal={16}
          marginVertical={8}
          onPress={() => onUpdateHabits()}
        >
          <Text color="white">Check</Text>
        </Button>

        <Button
          hitSlopArea
          center
          color="#D2691E"
          radius={4}
          paddingVertical={8}
          paddingHorizontal={16}
          marginVertical={8}
          onPress={() => onUpdateHabits()}
        >
          <Text color="white">Print update haits result</Text>
        </Button>

        <FlatList
          data={habits}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
