import React from "react";
import { useTheme } from "../hooks/useTheme";
import { Block, Icon, Text } from "./";
import { TSystemIconType } from "../assets/icons/icons";

interface ISettingRowProps {
  children?: React.ReactNode;
  icon: TSystemIconType;
  title: string;
  desc: string;
}

const SettingRow = ({ children, icon, title, desc }: ISettingRowProps) => {
  const { colors, sizes } = useTheme();
  return (
    <Block marginVertical={sizes.m} justify="space-between" align="center" row>
      <Block row align="center" style={{ flexShrink: 1 }}>
        <Icon icon={icon} marginRight={sizes.m} />
        <Block marginRight={sizes.xs}>
          <Text title>{title}</Text>
          <Text p color={colors.gray}>
            {desc}
          </Text>
        </Block>
      </Block>
      {children}
    </Block>
  );
};

export default SettingRow;
