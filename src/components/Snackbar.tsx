import React, { useEffect } from "react";
import { Button, Text } from "./";
import Animated, {
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeStyles } from "../hooks/useThemeStyles";

interface ISnackbarProps {
  type?: "success" | "error";
  onDismiss: (state: boolean) => void;
  message: string;
}

const Snackbar = ({ type, onDismiss, message }: ISnackbarProps) => {
  const { bottom: BOTTOM } = useSafeAreaInsets();
  const { colors } = useThemeStyles();

  const offset = useSharedValue(60);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset.value }],
    };
  });

  useEffect(() => {
    offset.value = withSpring(-BOTTOM);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      onDismiss(false);
    }, 4000);
  }, []);

  return (
    <Animated.View
      style={[rStyle, { alignSelf: "center", position: "absolute", bottom: 0 }]}
      exiting={FadeOut}
    >
      <Button
        padding={12}
        color={colors.success}
        onPress={() => onDismiss(false)}
      >
        <Text color="white">{message}</Text>
      </Button>
    </Animated.View>
  );
};

export default Snackbar;
