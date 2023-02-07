import { useState } from "react";
import { RootStackScreenProps } from "../types/rootNavigator";
import { Block, Text } from "../components";
import { useHabitsContext } from "../hooks/useHabitsContext";
import HomeNavbar from "../components/HomeNavbar";
import HabitRow from "../components/HabitRow";
import { FlatList } from "react-native";

import { useThemeMode } from "../hooks/useThemeMode";
import { useThemeStyles } from "../hooks/useThemeStyles";
import TodaySummaryBanner from "../components/TodaySummaryBanner";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import HomeEmptyState from "../components/HomeEmptyState";
import Separator from "../components/Separator";

// TODO: Fix bottom of flatList

const HomeScreen: React.FC<RootStackScreenProps<"HomeScreen">> = ({
  navigation,
}) => {
  const { habits, getHabit } = useHabitsContext();
  const { colors } = useThemeStyles();
  const { mode } = useThemeMode();
  const [showSeparator, setShowSeparator] = useState<boolean>(false);

  const separatorOpacity = useDerivedValue(() => {
    return showSeparator ? withTiming(1.0, { duration: 200 }) : withTiming(0.0);
  }, [showSeparator]);

  const rSeparatorOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: separatorOpacity.value,
    };
  });

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
      {mode === "light" && <Separator ifShow={showSeparator} />}

      <Block flex={1}>
        <FlatList
          data={habits}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingTop: 8,
            paddingHorizontal: 12,
            paddingBottom: 64,
          }}
          ListEmptyComponent={() => (
            <HomeEmptyState
              onPress={() => navigation.navigate("CreateHabitScreen")}
            />
          )}
          ListHeaderComponent={() =>
            habits.length > 0 && <TodaySummaryBanner />
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
