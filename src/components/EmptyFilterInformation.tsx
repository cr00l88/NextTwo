import React from "react";
import { Block, Text } from ".";
import { useThemeMode } from "../hooks/useThemeMode";
import { useThemeStyles } from "../hooks/useThemeStyles";

interface IEmptyFilterInformationProps {
  emptyFilterName: string;
}

const EmptyFilterInformation = ({
  emptyFilterName,
}: IEmptyFilterInformationProps) => {
  const { colors } = useThemeStyles();
  const { mode } = useThemeMode();

  return (
    <Block align="center" marginTop={32}>
      <Text h4 color={colors[mode].desc}>
        No habits in "{emptyFilterName}"
      </Text>
    </Block>
  );
};

export default EmptyFilterInformation;
