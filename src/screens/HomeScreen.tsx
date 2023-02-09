import { useMemo, useState } from "react";
import { FlatList } from "react-native";
import { RootStackScreenProps } from "../types/rootNavigator";
import { Block, Text } from "../components";
import { useHabitsContext } from "../hooks/useHabitsContext";
import { useThemeMode } from "../hooks/useThemeMode";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { TFilter } from "../types/filters";
import HomeNavbar from "../components/HomeNavbar";
import HabitRow from "../components/HabitRow";
import TodaySummaryBanner from "../components/TodaySummaryBanner";
import HomeEmptyState from "../components/HomeEmptyState";
import Separator from "../components/Separator";
import Filters from "../components/Filters";
import EmptyFilterInformation from "../components/EmptyFilterInformation";

// TODO: Fix bottom of flatList

const FILTERS: TFilter[] = ["All", "ToDo", "Done"];

const HomeScreen: React.FC<RootStackScreenProps<"HomeScreen">> = ({
  navigation,
}) => {
  const { habits, getHabit } = useHabitsContext();
  const { colors } = useThemeStyles();
  const { mode } = useThemeMode();
  const [showSeparator, setShowSeparator] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<TFilter>("All");

  const todo = useMemo(
    () => habits.filter((habit) => !habit.isDoneToday),
    [habits]
  );

  const done = useMemo(
    () => habits.filter((habit) => habit.isDoneToday),
    [habits]
  );

  const FILTER_CONDITION = {
    All: habits,
    ToDo: todo,
    Done: done,
  };

  const onNavigateToDetailes = (id: string) => {
    getHabit(id);
    navigation.navigate("HabitDetailsScreen", { id });
  };

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

  return (
    <Block safe flex={1} color={colors[mode].bg}>
      <HomeNavbar
        onPressSettings={() => navigation.navigate("SettingsScreen")}
        onPressCreate={() => navigation.navigate("CreateHabitScreen")}
      />
      {mode === "light" && <Separator ifShow={showSeparator} />}

      <Block flex={1}>
        <FlatList
          // data={habits}
          data={FILTER_CONDITION[selectedFilter]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingTop: 8,
            paddingHorizontal: 12,
            paddingBottom: 64,
          }}
          ListEmptyComponent={() =>
            habits.length > 0 ? (
              <EmptyFilterInformation emptyFilterName={selectedFilter} />
            ) : (
              <HomeEmptyState
                onPress={() => navigation.navigate("CreateHabitScreen")}
              />
            )
          }
          ListHeaderComponent={() =>
            habits.length > 0 && (
              <Block>
                <TodaySummaryBanner />
                <Filters
                  selected={selectedFilter}
                  filters={FILTERS}
                  onSelect={setSelectedFilter}
                />
              </Block>
            )
          }
          scrollEnabled={habits.length > 0}
          scrollEventThrottle={16}
          onScroll={(event) => {
            const offset = event.nativeEvent.contentOffset.y;
            setShowSeparator(offset > 8);
          }}
        />
      </Block>
    </Block>
  );
};

export default HomeScreen;
