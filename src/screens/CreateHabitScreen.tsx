import { useReducer, useState } from "react";
import { Pressable } from "react-native";
import { RootStackScreenProps } from "../types/rootNavigator";
import { Block, Text, Button, Input, Icon } from "../components";
import { useHabitsContext } from "../hooks/useHabitsContext";
import TitleToggleRow from "../components/TitleToggleRow";
import PrimaryButton from "../components/PrimaryButton";
import {
  createHabitFormInitialState,
  createHabitFormReducer,
  TCreateHabitFormUpdateType,
  TCreateHabitFormToggleType,
} from "../reducers/createHabitFormReducer";

import { useTheme } from "../hooks/useTheme";
import ModalNavbar from "../components/ModalNavbar";
import SelectHabitIconModal from "./SelectHabitIconModal";
import { THabitIconType } from "../assets/icons/icons";

const POMODORE_OPTIONS = ["15", "30", "60", "120"];

const CreateHabitScreen: React.FC<
  RootStackScreenProps<"CreateHabitScreen">
> = ({ navigation }) => {
  const { onCreateHabit } = useHabitsContext();
  const { colors, sizes } = useTheme();
  const [formState, formDispatch] = useReducer(
    createHabitFormReducer,
    createHabitFormInitialState
  );
  const [showSelectIconModal, setSelectIconModal] = useState<boolean>(false);

  const onChange = (input: TCreateHabitFormUpdateType, text: string) => {
    formDispatch({
      type: "UPDATE",
      payload: {
        key: input,
        value: text,
      },
    });
  };

  const onChangeIcon = (icon: THabitIconType) => {
    formDispatch({
      type: "UPDATE",
      payload: {
        key: "icon",
        value: icon,
      },
    });
  };

  const onToggle = (key: TCreateHabitFormToggleType) => {
    formDispatch({
      type: "TOGGLE",
      payload: {
        key,
      },
    });
  };

  const onPressPomodoreOption = (option: string) => {
    formDispatch({
      type: "UPDATE",
      payload: {
        key: "pomodoreTime",
        value: option,
      },
    });
  };

  const onCreateNewHabit = () => {
    if (formState.name) {
      onCreateHabit(formState);

      navigation.goBack();
    }
  };

  const isFrameOfPomodoreOptionFocused = (time: string) =>
    formState.pomodoreTime === time ? colors.black : colors.white;

  const isTextOfPomodoreOptionFocused = (time: string) =>
    formState.pomodoreTime === time ? colors.white : colors.black;

  const pomodoreOptions = () =>
    POMODORE_OPTIONS.map((option, i) => (
      <Button
        key={i}
        radius={4}
        paddingVertical={4}
        paddingHorizontal={8}
        border={formState.pomodoreTime !== option}
        color={isFrameOfPomodoreOptionFocused(option)}
        onPress={() => onPressPomodoreOption(option)}
      >
        <Text color={isTextOfPomodoreOptionFocused(option)}>
          {option + " min"}
        </Text>
      </Button>
    ));

  return (
    <Block flex={1} color="white">
      <ModalNavbar
        title="Create a new habit"
        onPressClose={() => navigation.goBack()}
      />

      <Block padding={sizes.padding}>
        <Button
          onPress={() => setSelectIconModal(true)}
          style={{
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 4,
            borderColor: colors.lightGray,
            borderWidth: 2,
          }}
        >
          <Icon icon="plus" color={colors.black} />
          <Text body marginTop={8}>
            Add icon
          </Text>
        </Button>

        <Block marginVertical={sizes.md}>
          <Text body>Name</Text>
          <Input
            value={formState.name}
            placeholder="Enter habit name"
            placeholderTextColor={colors.lightGray}
            fontSize={24}
            marginVertical={8}
            onChangeText={(text) => onChange("name", text)}
          />
        </Block>
        <Block>
          <Text body>Description</Text>
          <Input
            placeholder="Optional"
            // border
            // padding={12}
            placeholderTextColor={colors.lightGray}
            fontSize={24}
            marginVertical={8}
            onChangeText={(text) => onChange("desc", text)}
          />
        </Block>

        <TitleToggleRow
          title="Pomodore"
          initialState={formState.pomodore}
          onPress={() => onToggle("pomodore")}
        />

        {formState.pomodore && (
          <Block row justify="space-between" marginBottom={sizes.s}>
            {pomodoreOptions()}
          </Block>
        )}

        <TitleToggleRow
          title="Notification"
          initialState={false}
          onPress={() => onToggle("notification")}
        />

        <PrimaryButton
          title="Create a new project"
          onPress={onCreateNewHabit}
        />

        <Pressable
          onPress={() => console.log(formState)}
          style={{ backgroundColor: "blue" }}
        >
          <Text align="center" color={"white"}>
            Print data
          </Text>
        </Pressable>
      </Block>

      {showSelectIconModal && (
        <SelectHabitIconModal
          selected={formState.icon}
          onSelect={onChangeIcon}
          onClose={() => setSelectIconModal(false)}
        />
      )}
    </Block>
  );
};

export default CreateHabitScreen;
