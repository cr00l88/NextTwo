import React, { memo } from "react";
import { StyleProp, StyleSheet, Text as RNText, TextStyle } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "../hooks/useTheme";

type TTextStyleProps = Pick<
  TextStyle,
  | "margin"
  | "marginTop"
  | "marginBottom"
  | "marginLeft"
  | "marginRight"
  | "marginHorizontal"
  | "marginVertical"
>;

interface ITextProps extends TextStyle, TTextStyleProps {
  children?: React.ReactNode;
  animated?: boolean;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  body?: boolean;
  title?: boolean;
  p?: boolean;
  size?: TextStyle["fontSize"];
  weight?: TextStyle["fontWeight"];
  color?: string;
  align?: TextStyle["textAlign"];
  padding?: TextStyle["padding"];
  paddingTop?: TextStyle["paddingTop"];
  paddingBottom?: TextStyle["paddingBottom"];
  paddingLeft?: TextStyle["paddingLeft"];
  paddingRight?: TextStyle["paddingRight"];
  paddingHorizontal?: TextStyle["paddingHorizontal"];
  paddingVertical?: TextStyle["paddingVertical"];
  style?: StyleProp<TextStyle>;
}

const Text = ({
  children,
  animated,
  h1,
  h2,
  h3,
  h4,
  body,
  title,
  p,
  size,
  weight,
  color,
  align,
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
  ...props
}: ITextProps) => {
  const { colors, sizes, lineHeights } = useTheme();
  const textStyle = StyleSheet.flatten([
    {
      color: colors.text,
      fontSize: sizes.text,
      fontFamily: "Roboto-Regular",
      lineHeight: lineHeights.text,
    },
    h1 !== undefined && { fontSize: 36, fontWeight: "800" },
    h2 !== undefined && { fontSize: 32, fontWeight: "700" },
    h3 !== undefined && { fontSize: sizes.h3, fontWeight: "700" },
    h4 !== undefined && {
      fontSize: sizes.h4,
      fontFamily: "Roboto-Medium",
      lineHeight: lineHeights.h4,
      letterSpacing: -0.3,
    },
    body !== undefined && {
      fontSize: sizes.body,

      lineHeight: sizes.body + 8,
      letterSpacing: -0.3,
    },
    p !== undefined && {
      fontSize: sizes.p,
      fontWeight: "400",
      lineHeight: sizes.p + 4,
      letterSpacing: -0.1,
    },
    title !== undefined && {
      fontSize: sizes.title,
      fontWeight: "600",
      // letterSpacing: letterSpacing.title,
      lineHeight: lineHeights.title,
    },

    size !== undefined && { fontSize: size },
    weight === undefined && { fontWeight: weight },
    color !== undefined && { color: color },
    align !== undefined && { textAlign: align },
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
  ]) as TextStyle;

  if (animated) {
    return (
      <Animated.Text style={textStyle} {...props}>
        {children}
      </Animated.Text>
    );
  }

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};

export default memo(Text);
