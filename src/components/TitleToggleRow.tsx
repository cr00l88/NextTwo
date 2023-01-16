import React from "react";
import { useTheme } from "../hooks/useTheme";
import { useThemeMode } from "../hooks/useThemeMode";
import { Block, Text, Switch } from "./index";

interface ITitleToggleRowProps {
  title: string;
  initialState: boolean;
  onPress: () => void;
}

const TitleToggleRow = ({
  title,
  initialState,
  onPress,
}: ITitleToggleRowProps) => {
  const { sizes, colors } = useTheme();
  const { mode } = useThemeMode();

  return (
    <Block marginVertical={sizes.sm} justify="space-between" align="center" row>
      <Text title color={colors[mode].text}>
        {title}
      </Text>
      <Switch onValueChange={onPress} value={initialState} />
    </Block>
  );
};

export default TitleToggleRow;
