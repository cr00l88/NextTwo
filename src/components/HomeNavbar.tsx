import React from "react";
import { SvgXml } from "react-native-svg";
import { Icons } from "../assets/icons/icons";
import { useTheme } from "../hooks/useTheme";
import { useThemeMode } from "../hooks/useThemeMode";
import { Block, Button } from "./index";

interface IHomeNavbarProps {
  onPressCreate: () => void;
  onPressSettings: () => void;
}

const HomeNavbar = ({ onPressCreate, onPressSettings }: IHomeNavbarProps) => {
  const { colors } = useTheme();
  const { mode } = useThemeMode();
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
        color={mode === "light" ? colors.lightGray : colors.white}
        radius={4}
        padding={6}
        onPress={onPressSettings}
      >
        <SvgXml color={colors.black} xml={Icons["settings"]} />
      </Button>

      <SvgXml color={colors[mode].text} xml={Icons["logo"]} />

      <Button
        // hitSlopArea
        color={mode === "light" ? colors.black : colors.white}
        radius={4}
        padding={6}
        onPress={onPressCreate}
      >
        <SvgXml
          color={mode === "light" ? colors.white : colors.black}
          xml={Icons["createPlus"]}
        />
      </Button>
    </Block>
  );
};

export default HomeNavbar;
