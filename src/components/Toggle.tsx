import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  useDerivedValue,
} from "react-native-reanimated";
import { useTheme } from "../hooks/useTheme";

const WIDTH = 46;
const KNOB_SIZE = 16;
const PADDING = 4;

interface IToggleProps {
  initialState: boolean;
  onPress: () => void;
}

const Toggle = ({ initialState, onPress }: IToggleProps) => {
  const { colors } = useTheme();
  const [toggled, setToggled] = useState<boolean>(initialState);
  const offset = useSharedValue(0);
  const progress = useDerivedValue(() => {
    return toggled ? withTiming(0) : withTiming(1);
  }, [toggled]);

  const onPressToggle = () => {
    setToggled(!toggled);

    toggled
      ? (offset.value = withTiming(0))
      : (offset.value = withTiming(WIDTH - KNOB_SIZE - 8));

    onPress();
  };

  const knobAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const bgAniamtedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.black, colors.lightGray]
    );

    return { backgroundColor };
  });

  return (
    <Pressable onPress={onPressToggle}>
      <Animated.View
        style={[
          {
            height: KNOB_SIZE + PADDING * 2,
            width: WIDTH,
            paddingHorizontal: PADDING,
            justifyContent: "center",
            borderRadius: (KNOB_SIZE + PADDING * 2) / 2,
          },
          bgAniamtedStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              height: KNOB_SIZE,
              width: KNOB_SIZE,
              borderRadius: KNOB_SIZE / 2,
              backgroundColor: colors.white,
            },
            knobAnimatedStyles,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

export default Toggle;
