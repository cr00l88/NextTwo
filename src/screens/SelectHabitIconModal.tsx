import React from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  SectionList,
  StyleSheet,
  View,
} from "react-native";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { HabitIcons, THabitIconType } from "../assets/icons/icons";
import { Block, Button, Icon, Text } from "../components";
import ModalNavbar from "../components/ModalNavbar";
import { HABIT_ICONS_LIST } from "../utils/habitIconsList";
import IconsList from "../components/IconsList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ISelectHabitIconModalProps {
  selected?: THabitIconType | "none";
  onSelect: (icon: THabitIconType) => void;
  onClose: () => void;
}

const SelectHabitIconModal = ({
  onClose,
  onSelect,
  selected = "bike",
}: ISelectHabitIconModalProps) => {
  const { colors, sizes } = useThemeStyles();
  const IconList = Object.keys(HabitIcons) as THabitIconType[];

  return (
    <Modal animationType="slide" transparent>
      <Block flex={1}>
        <Pressable
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "rgba(0,0,0,0.2)" },
          ]}
          onPress={onClose}
        />
        <Block
          safe
          color="white"
          paddingHorizontal={16}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: SCREEN_HEIGHT / 2,
            borderTopLeftRadius: sizes.modalRadius,
            borderTopRightRadius: sizes.modalRadius,
          }}
        >
          <ModalNavbar title="Select icon" onPressClose={onClose} />
          <Block padding={16}>
            <IconsList
              selected={selected}
              onSelect={onSelect}
              onClose={onClose}
            />
          </Block>
        </Block>
      </Block>
    </Modal>
  );
};

export default SelectHabitIconModal;
