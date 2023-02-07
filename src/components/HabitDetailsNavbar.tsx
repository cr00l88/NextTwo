import React from "react";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { THabitDetailNavbar } from "../types/habit";
import { Block, Text, Icon, Button } from "./";
import HabitIcon from "./HabitIcon";
import IconButton from "./IconButton";

// TODO: Edit colors of close button

interface IHabitDetailsNavbarProps {
  habit: THabitDetailNavbar;
  onPressMore: () => void;
  onPressClose: () => void;
}

const HabitDetailsNavbar = ({
  habit,
  onPressMore,
  onPressClose,
}: IHabitDetailsNavbarProps) => {
  const { icon, name, desc } = habit;
  const { colors } = useThemeStyles();
  return (
    <Block
      row
      justify="space-between"
      align="center"
      paddingHorizontal={16}
      style={{ height: 64 }}
    >
      <Block row>
        {icon !== "none" && <HabitIcon icon={icon} />}
        <Block>
          <Text h4>{name}</Text>
          {desc.length > 0 && <Text>{desc}</Text>}
        </Block>
      </Block>

      <Block row>
        <IconButton
          border
          icon="more"
          padding={4}
          color={colors.black}
          onPress={onPressMore}
        />

        <Block style={{ width: 6 }} />

        <IconButton
          border
          icon="xMark"
          padding={4}
          color={colors.black}
          backgroundColor={colors.lightGray}
          onPress={onPressClose}
        />
      </Block>
    </Block>
  );
};

export default HabitDetailsNavbar;
