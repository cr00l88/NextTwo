import { Pressable, StatusBar, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../types/rootNavigator";
import { useHabitsContext } from "../hooks/useHabitsContext";
import { useTheme } from "../hooks/useTheme";
import { Block, Text, Button } from "../components";
import BottomSheet, { TBottomSheetRefProps } from "../components/BottomSheet";
import { useCallback, useRef, useState } from "react";

const PomodoroScreen: React.FC<RootStackScreenProps<"PomodoroScreen">> = ({
  navigation,
}) => {
  const { getHabit } = useHabitsContext();
  const { colors } = useTheme();
  const ref = useRef<TBottomSheetRefProps>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

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

  return (
    <Block flex={1} color={colors.black}>
      <StatusBar barStyle="light-content" />

      <Block flex={1} safe justify="center" align="center">
        <Text h4 color={colors.white} marginVertical={12}>
          Pomodoro
        </Text>

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
      </Block>

      {showOverlay && (
        <Pressable onPress={onPress}>
          <Block
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "rgba(0,0,0,0.2)" },
            ]}
          />
        </Pressable>
      )}

      <BottomSheet ref={ref} />
    </Block>
  );
};

export default PomodoroScreen;
