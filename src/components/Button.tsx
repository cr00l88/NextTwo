import React from "react";
import {
  StyleSheet,
  PressableProps,
  ViewStyle,
  StyleProp,
  Pressable,
} from "react-native";
import { useThemeStyles } from "../hooks/useThemeStyles";

type TViewStyleProps = Pick<ViewStyle, "width">;

interface IButtonProps extends TViewStyleProps, PressableProps {
  children?: React.ReactNode;
  color?: ViewStyle["backgroundColor"];
  colorPressed?: string;
  radius?: ViewStyle["borderRadius"];
  height?: ViewStyle["height"];
  margin?: ViewStyle["margin"];
  marginTop?: ViewStyle["marginTop"];
  marginBottom?: ViewStyle["marginBottom"];
  marginLeft?: ViewStyle["marginLeft"];
  marginRight?: ViewStyle["marginRight"];
  marginHorizontal?: ViewStyle["marginHorizontal"];
  marginVertical?: ViewStyle["marginVertical"];
  padding?: ViewStyle["padding"];
  paddingTop?: ViewStyle["paddingTop"];
  paddingBottom?: ViewStyle["paddingBottom"];
  paddingLeft?: ViewStyle["paddingLeft"];
  paddingRight?: ViewStyle["paddingRight"];
  paddingHorizontal?: ViewStyle["paddingHorizontal"];
  paddingVertical?: ViewStyle["paddingVertical"];
  center?: boolean;
  border?: boolean;
  hitSlopArea?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  children,
  color,
  colorPressed,
  radius,
  height,
  width,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginHorizontal,
  marginVertical,
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingHorizontal,
  paddingVertical,
  style,
  center,
  border,
  hitSlopArea,
  ...props
}: IButtonProps) => {
  const { sizes, colors } = useThemeStyles();

  const buttonStyle = StyleSheet.flatten([
    { borderRadius: sizes.buttonRadius },
    center !== undefined && { justifyContent: "center", alignItems: "center" },
    border !== undefined && { borderWidth: 2, borderColor: colors.lightGray },
    color !== undefined && { backgroundColor: color },
    radius !== undefined && { borderRadius: radius },
    height !== undefined && { height },
    margin !== undefined && { margin },
    marginTop !== undefined && { marginTop },
    marginBottom !== undefined && { marginBottom },
    marginLeft !== undefined && { marginLeft },
    marginRight !== undefined && { marginRight },
    marginHorizontal !== undefined && { marginHorizontal },
    marginVertical !== undefined && { marginVertical },
    padding !== undefined && { padding },
    paddingTop !== undefined && { paddingTop },
    paddingBottom !== undefined && { paddingBottom },
    paddingLeft !== undefined && { paddingLeft },
    paddingRight !== undefined && { paddingRight },
    paddingHorizontal !== undefined && { paddingHorizontal },
    paddingVertical !== undefined && { paddingVertical },
    style,
  ]) as ViewStyle;

  const hitSlop: PressableProps["hitSlop"] = {
    top: 10,
    bottom: 10,
    left: 0,
    right: 0,
  };

  return (
    <Pressable
      // hitSlop={hitSlopArea !== undefined && hitSlop}
      style={({ pressed }) => [
        buttonStyle,
        {
          backgroundColor:
            colorPressed === undefined ? color : pressed ? colorPressed : color,
          // backgroundColor: pressed
          //   ? colorPressed !== undefined
          //     ? colorPressed
          //     : color
          //   : color,
        },
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
};

export default Button;
