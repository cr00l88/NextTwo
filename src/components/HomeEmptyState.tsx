import React from "react";
import { SvgXml } from "react-native-svg";
import { Block, Text } from "./index";
import PrimaryButton from "./PrimaryButton";
import { NoHabits } from "../assets/illustrations/illustrations";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { useThemeMode } from "../hooks/useThemeMode";

interface IHomeEmptyStateProps {
  onPress: () => void;
}

const HomeEmptyState = ({ onPress }: IHomeEmptyStateProps) => {
  const { colors } = useThemeStyles();
  const { mode } = useThemeMode();
  return (
    <Block flex={1} justify="center" align="center">
      <SvgXml xml={NoHabits} />
      <Text h4 color={colors[mode].desc} marginTop={32} marginBottom={12}>
        No habit here
      </Text>
      <PrimaryButton title="Create first" onPress={onPress} />
    </Block>
  );
};

export default HomeEmptyState;
