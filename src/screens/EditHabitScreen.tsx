import { View, Text } from "react-native";
import React from "react";
import { RootStackScreenProps } from "../types/rootNavigator";
import { Block } from "../components";
import ModalNavbar from "../components/ModalNavbar";

const EditHabitScreen: React.FC<RootStackScreenProps<"EditHabitScreen">> = ({
  navigation,
}) => {
  return (
    <Block>
      <ModalNavbar
        title="Edit habit"
        onPressClose={() => navigation.goBack()}
      />
      <Text>EditHabitScreen</Text>
    </Block>
  );
};

export default EditHabitScreen;
