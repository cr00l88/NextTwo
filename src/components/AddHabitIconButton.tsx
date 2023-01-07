import React from "react";
import { StyleSheet } from "react-native";
import { Block, Text, Button, Input, Icon } from "./index";
import { THabitIconType } from "../assets/icons/icons";
import { useTheme } from "../hooks/useTheme";

interface IAddHabitIconButtonProps {
  currentIcon: THabitIconType | "none";
  onPress: () => void;
}

const AddHabitIconButton = ({
  currentIcon,
  onPress,
}: IAddHabitIconButtonProps) => {
  const { colors, sizes } = useTheme();

  if (currentIcon !== "none") {
    return (
      <Block>
        <Button
          onPress={onPress}
          style={[
            styles.frame,
            {
              backgroundColor: colors.lightGray,
            },
          ]}
        >
          <Icon icon={currentIcon} color={colors.black} />
        </Button>
      </Block>
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
