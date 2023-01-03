import React from "react";
import { useTheme } from "../hooks/useTheme";
import { Block, Text, Toggle } from "./index";

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
  const { sizes } = useTheme();

  return (
    <Block marginVertical={sizes.sm} justify="space-between" align="center" row>
      <Text title>{title}</Text>
      <Toggle initialState={initialState} onPress={onPress} />
    </Block>
  );
};

export default TitleToggleRow;
