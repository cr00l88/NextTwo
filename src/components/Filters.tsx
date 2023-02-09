import React from "react";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { TFilter } from "../types/filters";
import { Block, Button, Text } from "./";

export interface IFiltersProps {
  selected: TFilter;
  filters: TFilter[];
  onSelect: (newFilter: TFilter) => void;
}

const Filters = ({ selected, filters, onSelect }: IFiltersProps) => {
  const { colors } = useThemeStyles();

  const filterCell = (filter: TFilter, id: number) => (
    <Button key={id.toString()} onPress={() => onSelect(filter)}>
      <Block
        radius={6}
        marginHorizontal={2}
        paddingHorizontal={12}
        paddingVertical={4}
        color={filter === selected ? colors.black : colors.white}
      >
        <Text color={filter === selected ? colors.white : colors.black}>
          {filter}
        </Text>
      </Block>
    </Button>
  );

  return (
    <Block
      row
      justify="space-between"
      align="center"
      marginVertical={8}
      paddingHorizontal={8}
    >
      <Text body color={colors.light.desc}>
        Sort by:
      </Text>

      <Block row>{filters.map((filter, i) => filterCell(filter, i))}</Block>
    </Block>
  );
};

export default Filters;
