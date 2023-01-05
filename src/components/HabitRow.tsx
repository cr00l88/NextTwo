import { memo } from "react";
import { FlatList } from "react-native";
import { Block, Text, Button, Icon } from "./";
import { THabitRow } from "../types/habit";
import IconButton from "./IconButton";
import DayCell from "./DayCell";
import { useTheme } from "../hooks/useTheme";

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
  const { colors } = useTheme();
  const renderItem = ({ item }) => <DayCell status={item.status} />;

  return (
    <Button onPress={onPressRow}>
      <Block color={"white"} border shadow padding={16} marginVertical={4}>
        <Block row>
          {habit.icon !== "none" && <Icon icon={habit.icon} color="black" />}
          <Block>
            <Text h4>{habit.name}</Text>
            <Text p color={colors.gray}>
              {habit.desc}
            </Text>
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
    </Button>
  );
};

export default memo(HabitRow);
