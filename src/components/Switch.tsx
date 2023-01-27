import React from "react";
import { Switch as RNSwitch } from "react-native";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { useThemeMode } from "../hooks/useThemeMode";

interface ISwitchProps {
  value: boolean;
  onValueChange: () => void;
}

const Switch = ({ value, onValueChange }: ISwitchProps) => {
  const { colors } = useThemeStyles();
  const { mode } = useThemeMode();

  return (
    <RNSwitch
      trackColor={{
        false: colors.light.desc,
        true: mode === "dark" ? colors.white : colors.black,
      }}
      thumbColor={mode === "dark" ? colors.black : "#f4f3f4"}
      ios_backgroundColor={colors.light.desc}
      onValueChange={onValueChange}
      value={value}
    />
  );
};

export default Switch;
