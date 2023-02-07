import { Pressable, StatusBar, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../types/rootNavigator";
import { useHabitsContext } from "../hooks/useHabitsContext";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { Block, Text, Button } from "../components";
import BottomSheet, { TBottomSheetRefProps } from "../components/BottomSheet";
import { useCallback, useRef, useState } from "react";
import ModalNavbar from "../components/ModalNavbar";
import ProgressArc from "../components/ProgressArc";
import ProgreesArcRef, {
  TProgressArcRefProps,
} from "../components/ProgressArcRef";

const PomodoroScreen: React.FC<RootStackScreenProps<"PomodoroScreen">> = ({
  navigation,
  route,
}) => {
  const { id } = route.params;
  const { habit, getHabit, onMarkDoneToday } = useHabitsContext();
  const { colors } = useThemeStyles();
  const ref = useRef<TBottomSheetRefProps>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const arcRef = useRef<TProgressArcRefProps>(null);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();

    if (isActive) {
      ref?.current?.scrollTo(0);
      setShowOverlay(false);
    } else {
      ref?.current?.scrollTo(-200);
      setShowOverlay(true);
    }
  }, []);

  const minToMs = (time: number): number => {
    return Math.floor(time) * 60 * 1000;
  };

  return (
    <Block flex={1} color={colors.black} padding={16}>
      <StatusBar barStyle="light-content" />

      <Block flex={1} safe paddingHorizontal={16}>
        <Block row justify="space-between">
          <Text h4 color={colors.white} marginVertical={12}>
            Pomodoro
          </Text>
          <Text h4 color={colors.gray} marginVertical={12}>
            {habit.pomodoreTime} min
          </Text>
        </Block>

        {/* <ProgressArc cb={() => onMarkDoneToday(id)} /> */}
        <ProgreesArcRef ref={arcRef} cb={() => onMarkDoneToday(id)} />

        <Block row>
          <Button
            margin={8}
            padding={8}
            color={"white"}
            onPress={() => arcRef.current.start(minToMs(1))}
          >
            <Text>Start</Text>
          </Button>
          <Button
            margin={8}
            padding={8}
            color={"yellow"}
            onPress={() => arcRef.current.reset()}
          >
            <Text>Reset</Text>
          </Button>
        </Block>

        <Button
          center
          padding={10}
          color={colors.white}
          radius={4}
          onPress={() => navigation.goBack()}
        >
          <Text body color={colors.black}>
            Go home
          </Text>
        </Button>

        <Button
          center
          padding={10}
          color={colors.black}
          radius={4}
          onPress={onPress}
        >
          <Text body color={colors.white}>
            Show modal
          </Text>
        </Button>

        <Button
          center
          padding={10}
          color={colors.black}
          radius={4}
          onPress={() => onMarkDoneToday(id)}
        >
          <Text body color="yellow">
            Mark done
          </Text>
        </Button>
      </Block>

      <BottomSheet ref={ref}>
        <Block>
          <ModalNavbar
            title="Choose Time"
            onPressClose={() => ref?.current.closeModal()}
          />
          <Block style={{ width: 100, height: 100, backgroundColor: "red" }} />
        </Block>
      </BottomSheet>
    </Block>
  );
};

export default PomodoroScreen;
