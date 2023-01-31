import React, { useReducer, useState } from "react";
import { Dimensions, Pressable, StatusBar } from "react-native";
import { RootStackScreenProps } from "../types/rootNavigator";
import { Block, Text, Button, Input } from "../components";
import { useHabitsContext } from "../hooks/useHabitsContext";
import TitleToggleRow from "../components/TitleToggleRow";
import PrimaryButton from "../components/PrimaryButton";
import {
  createHabitFormInitialState,
  createHabitFormReducer,
  TCreateHabitFormUpdateType,
  TCreateHabitFormToggleType,
} from "../reducers/createHabitFormReducer";
import { useThemeStyles } from "../hooks/useThemeStyles";
import ModalNavbar from "../components/ModalNavbar";
import SelectHabitIconModal from "./SelectHabitIconModal";
import { THabitIconType } from "../assets/icons/icons";
import AddHabitIconButton from "../components/AddHabitIconButton";
import { useThemeMode } from "../hooks/useThemeMode";

const POMODORE_OPTIONS = ["15", "30", "60", "120"];

const { height } = Dimensions.get("window");

const CreateHabitScreen = ({
  navigation,
}: RootStackScreenProps<"CreateHabitScreen">) => {
  const { onCreateHabit } = useHabitsContext();
  const { colors, sizes } = useThemeStyles();
  const { mode } = useThemeMode();
  const [formState, formDispatch] = useReducer(
    createHabitFormReducer,
    createHabitFormInitialState
  );
  const [showSelectIconModal, setSelectIconModal] = useState<boolean>(false);

  const [contentHeight, setContentHeight] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  // const scrollEnabled = contentHeight > height;

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

  const onError = (type: "SET_ERROR" | "CLEAR_ERROR") => {
    formDispatch({
      type,
      payload: {
        key: "nameError",
      },
    });
  };

  const onCreateNewHabit = () => {
    if (formState.name) {
      onCreateHabit(formState);

      navigation.goBack();
    } else {
      onError("SET_ERROR");
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
    <Block flex={1} color={colors[mode].bg}>
      <StatusBar barStyle="light-content" />

      <ModalNavbar
        title="Create a new habit"
        onPressClose={() => navigation.goBack()}
      />

      <Block
        scroll
        color="yellow"
        paddingHorizontal={sizes.padding}
        scrollEnabled={!scrollEnabled}
        onContentSizeChange={(h) => {
          setScrollEnabled(h > contentHeight);
        }}
      >
        <Block
          color="red"
          paddingTop={sizes.padding}
          onLayout={(event) => {
            // console.log(event.currentTarget.measure);
            const h = event.nativeEvent.layout.height;
            setContentHeight(h);
          }}
        >
          <AddHabitIconButton
            currentIcon={formState.icon}
            onPress={() => setSelectIconModal(true)}
          />

          <Block marginVertical={sizes.md}>
            <Text
              body
              color={formState.nameError ? colors.error : colors[mode].text}
            >
              Name
            </Text>
            <Input
              value={formState.name}
              placeholder="Enter habit name"
              placeholderTextColor={colors.lightGray}
              fontSize={24}
              marginVertical={8}
              onChangeText={(text) => {
                onChange("name", text);
                onError("CLEAR_ERROR");
              }}
              onFocus={() => onError("CLEAR_ERROR")}
            />
          </Block>
          {formState.nameError && (
            <Text color={colors.error}>You have to fill this form</Text>
          )}
          <Block>
            <Text body color={colors[mode].text}>
              Description
            </Text>
            <Input
              placeholder="Optional"
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
            initialState={formState.notification}
            onPress={() => onToggle("notification")}
          />

          <PrimaryButton
            title="Create a new project"
            onPress={onCreateNewHabit}
          />
        </Block>

        {showSelectIconModal && (
          <SelectHabitIconModal
            selected={formState.icon}
            onSelect={onChangeIcon}
            onClose={() => setSelectIconModal(false)}
          />
        )}
      </Block>
    </Block>
  );
};

export default CreateHabitScreen;
