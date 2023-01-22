import { useState } from "react";
import { RootStackScreenProps } from "../types/rootNavigator";
import { Block, Text, Button, Icon } from "../components";
import { useHabitsContext } from "../hooks/useHabitsContext";
import { useTheme } from "../hooks/useTheme";
import ModalNavbar from "../components/ModalNavbar";

import { useThemeMode } from "../hooks/useThemeMode";
import DaysDetailList from "../components/DaysDetailList";

const HabitDetailsScreen: React.FC<
  RootStackScreenProps<"HabitDetailsScreen">
> = ({ navigation, route }) => {
  const { id } = route.params;
  const { colors } = useTheme();
  const { mode } = useThemeMode();
  const { habit, onMarkDoneToday } = useHabitsContext();
  const [isMarkDone, setMarkDone] = useState<boolean>(false);

  const onPressMarkDone = () => {
    onMarkDoneToday(id);
    setMarkDone(true);
  };

  const pomodoreInfo = () => (
    <Block row align="center" margin={8}>
      <Icon color={colors.black} icon="pomodoro" marginRight={4} />
      <Text h4 color={colors.black}>
        {habit.pomodoreTime + " min"}
      </Text>
    </Block>
  );

  return (
    <Block flex={1} color={"colors[mode].bg"}>
      <ModalNavbar
        showSeperator={false}
        onPressClose={() => navigation.goBack()}
      />
      <Block paddingHorizontal={16}>
        {habit.name ? (
          <Text h4 align="center">
            {habit.name}
          </Text>
        ) : (
          <Text>No name</Text>
        )}

        {habit.desc && (
          <Text p color={colors.gray}>
            {habit.desc}
          </Text>
        )}

        <Text>{habit.createdBy}</Text>

        {habit.pomodore && pomodoreInfo()}

        <Button
          disabled={isMarkDone}
          paddingHorizontal={12}
          paddingVertical={4}
          color={isMarkDone ? colors.lightGray : "#33FF99"}
          onPress={isMarkDone ? () => {} : () => onPressMarkDone()}
        >
          <Text color={"black"}>
            {isMarkDone
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

        <DaysDetailList days={habit.days} />
      </Block>
    </Block>
  );
};

export default HabitDetailsScreen;
