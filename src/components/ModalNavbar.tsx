import React, { useState } from "react";
import { SvgXml } from "react-native-svg";
import { SystemIcons } from "../assets/icons/icons";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { useThemeMode } from "../hooks/useThemeMode";
import { Block, Button, Text } from "./index";
import Separator from "./Separator";

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
  const { colors } = useThemeStyles();
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

      <Separator ifShow={showSeperator} />
    </Block>
  );
};

export default ModalNavbar;
