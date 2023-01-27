import React from "react";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { Block, Icon, Text } from "./";
import { TSystemIconType } from "../assets/icons/icons";
import { useThemeMode } from "../hooks/useThemeMode";

interface ISettingRowProps {
  children?: React.ReactNode;
  icon: TSystemIconType;
  title: string;
  desc: string;
}

const SettingRow = ({ children, icon, title, desc }: ISettingRowProps) => {
  const { colors, sizes } = useThemeStyles();
  const { mode } = useThemeMode();

  return (
    <Block marginVertical={sizes.m} justify="space-between" align="center" row>
      <Block row align="center" style={{ flexShrink: 1 }}>
        <Icon color={colors[mode].text} icon={icon} marginRight={sizes.m} />
        <Block marginRight={sizes.xs}>
          <Text title color={colors[mode].text}>
            {title}
          </Text>
          <Text p color={colors[mode].desc} style={{ flexShrink: 1 }}>
            {desc}
          </Text>
        </Block>
      </Block>
      {children}
    </Block>
  );
};

export default SettingRow;
