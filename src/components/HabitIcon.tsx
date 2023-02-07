import React from "react";
import { Block, Icon } from "./";
import { THabitIconType, TIcon } from "../assets/icons/icons";
import { useThemeStyles } from "../hooks/useThemeStyles";

interface IHabitIconProps {
  icon: THabitIconType | "none";
}

const HabitIcon = ({ icon }: IHabitIconProps) => {
  const { sizes, colors } = useThemeStyles();
  return (
    <Block
      justify="center"
      align="center"
      color={"#F3F3F3"}
      marginRight={sizes.s}
      padding={sizes.s}
      style={{ borderRadius: 4 }}
    >
      <Icon icon={icon} color={colors.black} />
    </Block>
  );
};

export default HabitIcon;
