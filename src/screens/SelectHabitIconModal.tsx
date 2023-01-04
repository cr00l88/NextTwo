import { Block, Text, Button, Icon } from "../components";
import ModalNavbar from "../components/ModalNavbar";
import { HabitIcons, THabitIconType } from "../assets/icons/icons";
import React, { useEffect } from "react";
import { FlatList, Modal, Pressable, StyleSheet } from "react-native";

interface ISelectHabitIconModalProps {
  selected?: THabitIconType;
  onClose: () => void;
}

const SelectHabitIconModal = ({
  onClose,
  selected = "bike",
}: ISelectHabitIconModalProps) => {
  const IconList = Object.keys(HabitIcons);

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
            style={{ marginVertical: 12 }}
            data={IconList}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
              <Block
                flex={1 / 3}
                align="center"
                paddingVertical={12}
                margin={2}
                border
              >
                <Text color={item === selected ? "green" : "black"}>
                  {item}
                </Text>
              </Block>
            )}
          />
        </Block>
      </Block>
    </Modal>
  );
};

export default SelectHabitIconModal;
