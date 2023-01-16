import React from "react";
import { Switch as RNSwitch } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useThemeMode } from "../hooks/useThemeMode";

interface ISwitchProps {
  value: boolean;
  onValueChange: () => void;
}

const Switch = ({ value, onValueChange }: ISwitchProps) => {
  const { colors } = useTheme();
  const { mode } = useThemeMode();

  return (
    <RNSwitch
      trackColor={{ false: colors.light.desc, true: colors.white }}
      thumbColor={mode === "dark" ? colors.black : "#f4f3f4"}
      ios_backgroundColor={colors.light.desc}
      onValueChange={onValueChange}
      value={value}
    />
  );
};

export default Switch;
