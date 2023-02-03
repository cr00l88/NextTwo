import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { Block, Icon, Text, Button } from "./index";
import { THabitIconType } from "../assets/icons/icons";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { color } from "react-native-reanimated";

interface IData {
  id: string;
  title: string;
  data: THabitIconType[];
}

const DATA: IData[] = [
  {
    id: "1",
    title: "Sport",
    data: ["football", "basketball"],
  },
  {
    id: "2",
    title: "Stuff",
    data: ["computer", "bike"],
  },
];

interface IIconListProps {
  selected: THabitIconType | "none";
  onSelect: (icon: string) => void;
  onClose: () => void;
}

const IconsList = ({ selected, onSelect, onClose }: IIconListProps) => {
  const { colors } = useThemeStyles();
  const onPressIcon = (item: string) => {
    onSelect(item);
    onClose();
  };

  const header = (title: string) => <Text h4>{title}</Text>;

  const renderItem = ({ item }) => (
    <Button onPress={() => onPressIcon(item)}>
      <Block
        align="center"
        justify="center"
        paddingVertical={12}
        padding={24}
        border
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
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <FlatList
          data={item.data}
          ListHeaderComponent={() => header(item.title)}
          numColumns={4}
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    />
  );
};

export default IconsList;
