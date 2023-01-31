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

  const renderItem = ({ item }) => (
    <Button
      onPress={() => {
        onSelect(item);
        onClose();
      }}
    >
      <Block
        align="center"
        justify="center"
        paddingVertical={12}
        padding={24}
        border={item !== selected}
        color={item === selected ? colors.black : colors.white}
      >
        <Icon
          icon={item}
          color={item === selected ? colors.white : colors.black}
        />
      </Block>
    </Button>
  );

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
            <FlatList
              style={{ marginHorizontal: sizes.padding, paddingVertical: 12 }}
              data={IconList}
              numColumns={4}
              columnWrapperStyle={{ justifyContent: "space-evenly" }}
              renderItem={renderItem}
            />
          </Block>
        </Block>
      </Block>
    </Modal>
  );

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
          <FlatList
            style={{ marginHorizontal: sizes.padding, paddingVertical: 12 }}
            data={IconList}
            numColumns={4}
            columnWrapperStyle={{ justifyContent: "space-evenly" }}
            renderItem={renderItem}
          />
        </Block>
      </Block>
    </Modal>
  );
};

export default SelectHabitIconModal;
