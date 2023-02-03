import React from "react";
import { StyleSheet } from "react-native";
import { Block, Text, Button, Input, Icon } from "./index";
import { THabitIconType } from "../assets/icons/icons";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { useThemeMode } from "../hooks/useThemeMode";

interface IAddHabitIconButtonProps {
  currentIcon: THabitIconType | "none";
  onPress: () => void;
}

const AddHabitIconButton = ({
  currentIcon,
  onPress,
}: IAddHabitIconButtonProps) => {
  const { colors, sizes } = useThemeStyles();
  const { mode } = useThemeMode();

  if (currentIcon !== "none") {
    return (
      <Button
        style={[
          styles.frame,
          {
            borderWidth: 1,
            borderColor: colors.lightGray,
          },
        ]}
        color={colors[mode].frame}
        colorPressed={colors[mode].framePressed}
        onPress={onPress}
      >
        <Icon icon={currentIcon} color={colors.black} />

        <Block style={{ position: "absolute", bottom: 2, right: 2 }}>
          <Icon icon="change" color={colors.black} />
        </Block>
      </Button>
    );
  } else {
    return (
      <Block>
        <Button
          onPress={onPress}
          style={[
            styles.frame,
            {
              borderColor: colors.lightGray,
              borderWidth: 2,
            },
          ]}
          color={colors[mode].frame}
          colorPressed={colors[mode].framePressed}
        >
          <Icon icon="plus" color={colors.black} />
          <Text body marginTop={8}>
            Add icon
          </Text>
        </Button>
      </Block>
    );
  }
};

const styles = StyleSheet.create({
  frame: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    borderRadius: 4,
  },
});

export default AddHabitIconButton;
