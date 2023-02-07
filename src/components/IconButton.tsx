import React from "react";
import {
  PressableProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { SystemIcons, TSystemIconType } from "../assets/icons/icons";
import { SvgXml } from "react-native-svg";
import { ColorValue } from "react-native";
import { useThemeStyles } from "../hooks/useThemeStyles";

interface IIconButtonProps {
  icon: TSystemIconType;
  border?: boolean;
  color?: ColorValue | string;
  backgroundColor?: string;
  hitSlop?: number;
  radius?: number;
  padding?: number;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const IconButton: React.FC<IIconButtonProps> = ({
  icon,
  border,
  color = "black",
  backgroundColor = "white",
  hitSlop,
  radius,
  padding,
  onPress,
  style,
  ...props
}) => {
  const { colors } = useThemeStyles();

  const buttonStyle = StyleSheet.flatten([
    border !== undefined && {
      borderWidth: 1,
      borderColor: colors.lightGray,
      borderRadius: 6,
    },
    backgroundColor !== undefined && { backgroundColor },
    radius !== undefined && { borderRadius: radius },
    padding !== undefined && { padding },
    style,
  ]);
  const hitSlopArea: PressableProps["hitSlop"] = {
    top: 10,
    bottom: 10,
    left: 0,
    right: 0,
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={hitSlop ? hitSlopArea : undefined}
      style={buttonStyle}
      {...props}
    >
      <SvgXml color={color} xml={SystemIcons[icon]} />
    </TouchableOpacity>
  );
};

export default IconButton;
