import React, { useState } from "react";
import { SvgXml } from "react-native-svg";
import { SystemIcons } from "../assets/icons/icons";
import { useTheme } from "../hooks/useTheme";
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

        {title && <Text h4>{title}</Text>}

        <Button
          hitSlopArea
          padding={6}
          onPress={onPressClose}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setCounterWidth(width);
          }}
        >
          <SvgXml color={colors.black} xml={SystemIcons["xMark"]} />
        </Button>
      </Block>

      {showSeperator && (
        <Block color={colors.lightGray} style={{ height: 1 }} />
      )}
    </Block>
  );
};

export default ModalNavbar;
