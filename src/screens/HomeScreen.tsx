import { RootStackScreenProps } from "../types/rootNavigator";
import { Block, Text, Button } from "../components";
import { useHabitsContext } from "../hooks/useHabitsContext";
import HomeNavbar from "../components/HomeNavbar";
import HabitRow from "../components/HabitRow";
import { FlatList } from "react-native";

const HomeScreen: React.FC<RootStackScreenProps<"HomeScreen">> = ({
  navigation,
}) => {
  const { habits, getHabit, onDeleteAllHabits, onUpdateHabits, onDeleteHabit } =
    useHabitsContext();

  const renderItem = ({ item }) => (
    <HabitRow
      key={item.id}
      habit={item}
      onPressRow={() => onNavigateToDetailes(item.id)}
      onPressMoreOptions={() => {
        getHabit(item.id);
        navigation.navigate("HabitActionSheetModal", { id: item.id });
      }}
      onPressDelete={() => onDeleteHabit(item.id)}
    />
  );

  const onNavigateToDetailes = (id: string) => {
    getHabit(id);
    navigation.navigate("HabitDetailsScreen", { id });
  };

  return (
    <Block safe flex={1} color="white">
      <HomeNavbar
        onPressSettings={() => navigation.navigate("SettingsScreen")}
        onPressCreate={() => navigation.navigate("CreateHabitScreen")}
      />
      <Block paddingHorizontal={16}>
        <Button
          hitSlopArea
          color="navy"
          radius={4}
          paddingVertical={8}
          paddingHorizontal={16}
          marginVertical={8}
          onPress={() =>
            console.log(!habits.length ? "nothing to print" : habits[0].days)
          }
        >
          <Text color="white" align="center">
            Print habit
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

        <FlatList
          data={habits}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <Text h4 color="gray" align="center">
              No habit here
            </Text>
          )}
        />
      </Block>
    </Block>
  );
};

export default HomeScreen;
