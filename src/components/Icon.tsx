import React from "react";
import { ColorValue, StyleSheet, ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";
import { Icons, TIconType } from "../assets/icons/icons";
import { useTheme } from "../hooks/useTheme";
import Block from "./Block";

interface IIconProps {
  icon: TIconType;
  color?: ColorValue;
  size?: number;
  margin?: ViewStyle["margin"];
  marginTop?: ViewStyle["marginTop"];
  marginBottom?: ViewStyle["marginBottom"];
  marginLeft?: ViewStyle["marginLeft"];
  marginRight?: ViewStyle["marginRight"];
  marginHorizontal?: ViewStyle["marginHorizontal"];
  marginVertical?: ViewStyle["marginVertical"];
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
  const { colors } = useTheme();

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
