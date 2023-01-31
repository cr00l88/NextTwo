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

const HomeScreen: React.FC<RootStackScreenProps<"HomeScreen">> = ({
  navigation,
}) => {
  const { habits, getHabit } = useHabitsContext();
  const { colors } = useThemeStyles();
  const { mode } = useThemeMode();
  const [showSeparator, setShowSeparator] = useState<boolean>(false);

  const separatorOpacity = useDerivedValue(() => {
    return showSeparator ? withTiming(1.0) : withTiming(0.0);
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
      {showSeparator && mode === "light" && (
        <Animated.View style={rSeparatorOpacityStyle}>
          <Block
            color={colors.lightGray}
            style={{ height: 1, width: "100%" }}
          />
        </Animated.View>
      )}

      <Block>
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
            <Text h4 margin={8} color="gray" align="center">
              No habit here
            </Text>
          )}
          ListHeaderComponent={() => habits && <TodaySummaryBanner />}
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
