import { useState } from "react";
import { RootStackScreenProps } from "../types/rootNavigator";
import { Block, Text, Button, Icon } from "../components";
import { useHabitsContext } from "../hooks/useHabitsContext";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { useThemeMode } from "../hooks/useThemeMode";
import DaysDetailList from "../components/DaysDetailList";
import HabitDetailsNavbar from "../components/HabitDetailsNavbar";
import Separator from "../components/Separator";
import HabitStats from "../components/HabitStats";

const HabitDetailsScreen: React.FC<
  RootStackScreenProps<"HabitDetailsScreen">
> = ({ navigation, route }) => {
  const { id } = route.params;
  const { colors } = useThemeStyles();
  const { mode } = useThemeMode();
  const { habit, onMarkDoneToday } = useHabitsContext();
  const [showSeparator, setShowSeparator] = useState<boolean>(false);

  const onPressMarkDone = () => {
    if (habit.pomodore) {
      navigation.navigate("PomodoroScreen", { id });
    } else {
      onMarkDoneToday(id);
    }
  };

  return (
    <Block flex={1} color={colors[mode].bg}>
      <HabitDetailsNavbar
        habit={habit}
        onPressMore={() => navigation.navigate("HabitActionSheetModal", { id })}
        onPressClose={() => navigation.goBack()}
      />
      <Separator ifShow={showSeparator} />

      <Block
        scroll
        nestedScrollEnabled
        paddingTop={8}
        paddingBottom={32}
        paddingHorizontal={16}
        scrollEventThrottle={16}
        onScroll={(event) => {
          const offset = event.nativeEvent.contentOffset.y;
          setShowSeparator(offset > 8);
        }}
      >
        <Block row>
          <Button
            disabled={habit.isDoneToday}
            // paddingHorizontal={12}
            paddingVertical={12}
            color={habit.isDoneToday ? colors.lightGray : colors.black}
            style={{ flex: 1, alignItems: "center" }}
            onPress={habit.isDoneToday ? () => {} : () => onPressMarkDone()}
          >
            <Text size={18} color={colors.white}>
              {habit.isDoneToday
                ? "Marked today"
                : habit.pomodore
                ? "Start pomodore"
                : "Mark done"}
            </Text>
          </Button>
        </Block>

        <HabitStats
          dayNumber={3}
          progressNumber={12}
          pomodoro={{ isActive: habit.pomodore, time: habit.pomodoreTime }}
        />

        <Button
          disabled={habit.isDoneToday}
          paddingHorizontal={12}
          paddingVertical={4}
          color={habit.isDoneToday ? colors.lightGray : "#33FF99"}
          onPress={habit.isDoneToday ? () => {} : () => onPressMarkDone()}
        >
          <Text color={"black"}>
            {habit.isDoneToday
              ? "Marked today"
              : habit.pomodore
              ? "Start pomodore"
              : "Mark done"}
          </Text>
        </Button>

        <Button
          paddingHorizontal={12}
          paddingVertical={4}
          color={"#FF9033"}
          onPress={() => navigation.navigate("HabitActionSheetModal", { id })}
        >
          <Text color={"black"}>More options</Text>
        </Button>

        <Button
          paddingHorizontal={12}
          paddingVertical={4}
          color={"navy"}
          onPress={() => console.log(habit)}
        >
          <Text color={"white"}>Print habit</Text>
        </Button>

        <Block>
          <DaysDetailList days={habit.days} />
        </Block>

        <Block marginTop={12} marginBottom={32} align="center">
          <Text h4>Created By</Text>
          <Text color={colors[mode].desc}>{habit.createdBy}</Text>
        </Block>
      </Block>
    </Block>
  );
};

export default HabitDetailsScreen;
