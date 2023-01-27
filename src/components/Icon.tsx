import React from "react";
import { ColorValue, StyleSheet, View, ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";
import { Icons, TIcon } from "../assets/icons/icons";
import { useThemeStyles } from "../hooks/useThemeStyles";
import Block from "./Block";

type TViewStyleProps = Pick<
  ViewStyle,
  | "margin"
  | "marginTop"
  | "marginBottom"
  | "marginLeft"
  | "marginRight"
  | "marginHorizontal"
  | "marginVertical"
>;

interface IIconProps extends TViewStyleProps {
  icon: TIcon;
  color?: ColorValue;
  size?: number;
}

const Icon = ({
  icon,
  color,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginHorizontal,
  marginVertical,
}: IIconProps) => {
  const { colors } = useThemeStyles();

  const IconStyle = StyleSheet.flatten([
    margin !== undefined && { margin },
    marginTop !== undefined && { marginTop },
    marginBottom !== undefined && { marginBottom },
    marginLeft !== undefined && { marginLeft },
    marginRight !== undefined && { marginRight },
    marginHorizontal !== undefined && { marginHorizontal },
    marginVertical !== undefined && { marginVertical },
  ]) as ViewStyle;

  return (
    <Block style={IconStyle}>
      <SvgXml
        color={color !== undefined ? color : colors.black}
        xml={Icons[icon]}
      />
    </Block>
  );
};

export default Icon;
