import React, { useState } from "react";
import { SvgXml } from "react-native-svg";
import { SystemIcons } from "../assets/icons/icons";
import { useTheme } from "../hooks/useTheme";
import { useThemeMode } from "../hooks/useThemeMode";
import { Block, Button, Text } from "./index";

interface IModalNavbarProps {
  title?: string;
  showSeperator?: boolean;
  onPressClose: () => void;
}

const ModalNavbar = ({
  title,
  showSeperator = true,
  onPressClose,
}: IModalNavbarProps) => {
  const { colors } = useTheme();
  const { mode } = useThemeMode();
  const [counterWidth, setCounterWidth] = useState<number>(0);

  return (
    <Block>
      <Block
        row
        justify="space-between"
        align="center"
        paddingHorizontal={16}
        paddingVertical={8}
      >
        <Block style={{ width: counterWidth }} />

        {title && (
          <Text h4 color={colors[mode].text}>
            {title}
          </Text>
        )}

        <Button
          hitSlopArea
          padding={6}
          onPress={onPressClose}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setCounterWidth(width);
          }}
        >
          <SvgXml color={colors[mode].icon} xml={SystemIcons["xMark"]} />
        </Button>
      </Block>

      {showSeperator && (
        <Block color={colors[mode].separator} style={{ height: 1 }} />
      )}
    </Block>
  );
};

export default ModalNavbar;
