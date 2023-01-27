import { memo } from "react";
import { FlatList, Pressable } from "react-native";
import { Block, Text, Button, Icon } from "./";
import { THabitRow } from "../types/habit";
import IconButton from "./IconButton";
import DayCell from "./DayCell";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { useThemeMode } from "../hooks/useThemeMode";

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

  return (
    <Pressable onPress={onPressRow} onLongPress={onPressMoreOptions}>
      {({ pressed }) => (
        <Block>
          <Block
            color={pressed ? "#F5F2F2" : colors[mode].frame}
            border={mode === "light" ? true : undefined}
            shadow
            padding={16}
            marginVertical={4}
          >
            <Block row align="center" marginBottom={10}>
              {habit.icon !== "none" && (
                <Block
                  justify="center"
                  align="center"
                  color={"#F3F3F3"}
                  marginRight={sizes.s}
                  padding={sizes.s}
                  style={{ borderRadius: 4 }}
                >
                  <Icon icon={habit.icon} color="black" />
                </Block>
              )}
              <Block>
                <Text h4 color={colors[mode].text}>
                  {habit.name}
                </Text>
                {habit.desc && (
                  <Text p color={colors[mode].desc}>
                    {habit.desc}
                  </Text>
                )}
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
            color={colors.gray}
            onPress={onPressMoreOptions}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 22,
              height: 22,
              borderRadius: 4,
              backgroundColor: "white",
            }}
          />
        </Block>
      )}
    </Pressable>
  );
};

export default memo(HabitRow);
