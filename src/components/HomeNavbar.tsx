import React from "react";
import { SvgXml } from "react-native-svg";
import { Icons } from "../assets/icons/icons";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { useThemeMode } from "../hooks/useThemeMode";
import { Block, Button } from "./index";

interface IHomeNavbarProps {
  onPressCreate: () => void;
  onPressSettings: () => void;
}

const HomeNavbar = ({ onPressCreate, onPressSettings }: IHomeNavbarProps) => {
  const { colors } = useThemeStyles();
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
        color={mode === "light" ? "#F2F0F0" : colors.white}
        colorPressed={"green"}
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
        colorPressed={mode === "dark" ? "#D6D6D6" : "#2B2B2B"}
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
