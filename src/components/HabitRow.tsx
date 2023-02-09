import { memo } from "react";
import { FlatList, Pressable } from "react-native";
import * as Haptics from "expo-haptics";
import { Block, Text, Icon } from "./";
import { THabitRow } from "../types/habit";
import IconButton from "./IconButton";
import DayCell from "./DayCell";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { useThemeMode } from "../hooks/useThemeMode";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import HabitIcon from "./HabitIcon";

interface IHabitRowProps {
  habit: THabitRow;
  onPressRow?: () => void;
  onPressMoreOptions: () => void;
}

const HabitRow = ({
  habit,
  onPressRow,
  onPressMoreOptions,
}: IHabitRowProps) => {
  const { colors, sizes } = useThemeStyles();
  const { mode } = useThemeMode();
  const renderItem = ({ item }) => <DayCell status={item.status} />;

  const pressed = useSharedValue<number>(1.0);

  const rFrameStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pressed.value }],
    };
  });

  const onLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onPressMoreOptions();
  };

  const onPressIn = () => {
    "worklet";
    pressed.value = withSpring(0.98);
  };

  const onPressOut = () => {
    "worklet";
    pressed.value = withSpring(1.0);
  };

  return (
    <Pressable
      onPress={onPressRow}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      delayLongPress={300}
    >
      {({ pressed }) => (
        <Animated.View style={rFrameStyle} entering={FadeIn} exiting={FadeOut}>
          <Block
            color={pressed ? colors[mode].framePressed : colors[mode].frame}
            border={mode === "light" ? true : undefined}
            shadow
            padding={16}
            marginVertical={4}
          >
            <Block row align="center" marginBottom={10}>
              {habit.icon !== "none" && <HabitIcon icon={habit.icon} />}
              <Block>
                <Text h4 color={colors[mode].text}>
                  {habit.name}
                </Text>
                <Block row align="center">
                  {habit.pomodore && (
                    <Icon icon="pomodoro" color={colors[mode].desc} />
                  )}
                  {habit.desc && habit.pomodore && (
                    <Block
                      marginHorizontal={6}
                      color={colors[mode].desc}
                      style={{ width: 6, height: 6, borderRadius: 3 }}
                    />
                  )}
                  {habit.desc && (
                    <Text p color={colors[mode].desc}>
                      {habit.desc}
                    </Text>
                  )}
                </Block>
              </Block>
            </Block>

            <FlatList
              numColumns={15}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              ItemSeparatorComponent={() => <Block style={{ height: 4 }} />}
              data={habit.days}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </Block>

          <IconButton
            icon="more"
            hitSlop={16}
            color={colors[mode].desc}
            onPress={onPressMoreOptions}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 22,
              height: 22,
              borderRadius: 4,
            }}
          />
        </Animated.View>
      )}
    </Pressable>
  );
};

export default memo(HabitRow);
