import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../types/rootNavigator";
import { Block, Text, Button } from "../components";
import { useHabitsContext } from "../hooks/useHabitsContext";
import { useTheme } from "../hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

const HabitActionSheetModal: React.FC<
  RootStackScreenProps<"HabitActionSheetModal">
> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { id } = route.params;
  const { habit, onMarkDoneToday, onDeleteHabit } = useHabitsContext();
  const { colors, sizes } = useTheme();

  const fade = useSharedValue(0.0);

  const rFadeStyle = useAnimatedStyle(() => {
    return {
      opacity: fade.value,
    };
  });

  useEffect(() => {
    fade.value = withDelay(250, withSpring(0.2));
  }, []);

  const closeModal = () => {
    fade.value = withSpring(0.0);
    setTimeout(() => {
      navigation.goBack();
    }, 200);
  };

  const onPressMarkDone = () => {
    onMarkDoneToday(id);

    closeModal();
  };

  const onPressDelete = () => {
    onDeleteHabit(id);
    navigation.navigate("HomeScreen");
  };

  return (
    <Block flex={1}>
      <Pressable onPress={closeModal} style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "black" },
            rFadeStyle,
          ]}
        />
      </Pressable>
      <Block
        modal
        color={colors.white}
        paddingHorizontal={sizes.m}
        paddingTop={sizes.m}
        paddingBottom={insets.bottom}
      >
        <Block>
          {habit.name ? (
            <Text h4 style={{ alignSelf: "center" }}>
              {habit.name}
            </Text>
          ) : (
            <Text>No name</Text>
          )}

          <Button
            center
            marginVertical={sizes.s}
            paddingVertical={sizes.s}
            color={colors.black}
            onPress={onPressMarkDone}
          >
            <Text body color={colors.white}>
              Mark done
            </Text>
          </Button>

          <Button
            center
            border
            marginVertical={sizes.s}
            paddingVertical={sizes.s}
            onPress={onPressDelete}
          >
            <Text body color={colors.error}>
              Delete habit
            </Text>
          </Button>

          <Button
            center
            marginVertical={sizes.s}
            paddingVertical={sizes.s}
            color={colors.lightGray}
            onPress={closeModal}
          >
            <Text body color={colors.black}>
              Close
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

export default HabitActionSheetModal;
