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
import { useTheme } from "../hooks/useTheme";
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
            height: SCREEN_HEIGHT / 2,
            borderTopLeftRadius: sizes.modalRadius,
            borderTopRightRadius: sizes.modalRadius,
          }}
        >
          <ModalNavbar title="Select icon" onPressClose={onClose} />
          <Block padding={16}>
            <SectionList
              sections={HABIT_ICONS_LIST}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item, index, section }) => (
                <FlatList
                  data={section.data}
                  // horizontal={true}
                  columnWrapperStyle={{ justifyContent: "space-between" }}
                  numColumns={4}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <Block
                      align="center"
                      paddingVertical={8}
                      flex={1}
                      border
                      margin={2}
                    >
                      <Text>{item}</Text>
                    </Block>
                  )}
                  // ListFooterComponent={<Block style={{ height: 32 }} />}
                />
                // <View
                //   style={{
                //     backgroundColor: "#f9c2ff",
                //     padding: 20,
                //     marginVertical: 8,
                //   }}
                // >
                //   <Text>{item}</Text>
                // </View>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text
                  style={{
                    fontSize: 20,
                    backgroundColor: "white",
                    marginLeft: 8,
                    marginVertical: 8,
                  }}
                >
                  {title}
                </Text>
              )}
            />
          </Block>

          {/* <FlatList
            style={{ marginHorizontal: sizes.padding, paddingVertical: 12 }}
            data={IconList}
            numColumns={4}
            columnWrapperStyle={{ justifyContent: "space-evenly" }}
            renderItem={renderItem}
          /> */}
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
