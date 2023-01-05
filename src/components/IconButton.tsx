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

interface IIconButtonProps {
  icon: TSystemIconType;
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
  color = "white",
  backgroundColor = "navy",
  hitSlop,
  radius,
  padding,
  onPress,
  style,
  ...props
}) => {
  const buttonStyle = StyleSheet.flatten([
    color !== undefined && { backgroundColor: color },
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
      hitSlop={hitSlop !== undefined && hitSlopArea}
      style={buttonStyle}
      {...props}
    >
      <SvgXml color={color} xml={SystemIcons[icon]} />
    </TouchableOpacity>
  );
};

export default IconButton;
