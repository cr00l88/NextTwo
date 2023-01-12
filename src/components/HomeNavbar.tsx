import React from "react";
import { SvgXml } from "react-native-svg";
import { Icons } from "../assets/icons/icons";
import { useTheme } from "../hooks/useTheme";
import { Block, Button } from "./index";

interface IHomeNavbarProps {
  onPressCreate: () => void;
  onPressSettings: () => void;
}

const HomeNavbar = ({ onPressCreate, onPressSettings }: IHomeNavbarProps) => {
  const { colors } = useTheme();
  return (
    <Block
      row
      justify="space-between"
      align="center"
      paddingHorizontal={16}
      paddingVertical={8}
    >
      <Button
        // hitSlopArea
        color={colors.lightGray}
        radius={4}
        padding={6}
        onPress={onPressSettings}
      >
        <SvgXml color={colors.black} xml={Icons["settings"]} />
      </Button>

      <SvgXml color={colors.black} xml={Icons["logo"]} />

      <Button
        // hitSlopArea
        color={colors.black}
        radius={4}
        padding={6}
        onPress={onPressCreate}
      >
        <SvgXml color={colors.white} xml={Icons["createPlus"]} />
      </Button>
    </Block>
  );
};

export default HomeNavbar;
