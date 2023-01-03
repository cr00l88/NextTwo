import React from "react";
import {
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Icons, TIconType } from "../assets/icons/icons";
import { SvgXml } from "react-native-svg";
import { ColorValue } from "react-native";

interface IIconButtonProps {
  icon: TIconType;
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
      <SvgXml color={color} xml={Icons[icon]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
});

export default IconButton;
