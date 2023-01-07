import React from "react";
import { FlatList, Modal, Pressable, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { HabitIcons, THabitIconType } from "../assets/icons/icons";
import { Block, Button, Icon } from "../components";
import ModalNavbar from "../components/ModalNavbar";

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
  const { colors, sizes } = useTheme();
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
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
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
