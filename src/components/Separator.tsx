import { View, Text } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { Block } from "./";

interface ISeperatorProps {
  ifShow?: boolean;
}

const Separator = ({ ifShow = true }: ISeperatorProps) => {
  const { colors } = useThemeStyles();

  const separatorOpacity = useDerivedValue(() => {
    return ifShow ? withTiming(1.0, { duration: 200 }) : withTiming(0.0);
  }, [ifShow]);

  const rSeparatorOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: separatorOpacity.value,
    };
  });
  return (
    <Animated.View style={rSeparatorOpacityStyle}>
      <Block color={colors.lightGray} style={{ height: 1, width: "100%" }} />
    </Animated.View>
  );
};

export default Separator;
