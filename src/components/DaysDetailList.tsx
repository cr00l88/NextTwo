import { FlatList } from "react-native";
import { Block, Text } from "./";
import { IDay, TDayCellType } from "../types/dayCell";
import { useTheme } from "../hooks/useTheme";
import { MONTH_SHORT } from "../utils/monthsShort";

interface IDaysDetailListProps {
  days: IDay[];
  colNums?: number;
}

const DaysDetailList = ({ days, colNums = 6 }: IDaysDetailListProps) => {
  const { colors } = useTheme();

  const FRAME_COLOR: Record<TDayCellType, string> = {
    MISS: "red",
    NEXT: colors.lightGray,
    SUCCESS: "green",
    TODAY_SUCCESS: "purple",
    TODAY_TODO: "yellow",
  };

  const renderItem = ({ item }: { item: IDay }) => (
    <Block
      flex={1}
      margin={2}
      paddingVertical={8}
      color={FRAME_COLOR[item.status]}
      align="center"
      style={{ borderRadius: 4 }}
    >
      <Text size={20}>{item.date.split("/")[2]}</Text>
      <Text size={14}>{MONTH_SHORT[item.date.split("/")[1]]}</Text>
    </Block>
  );
  return (
    <FlatList
      numColumns={colNums}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      contentContainerStyle={{ paddingVertical: 16 }}
      data={days}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default DaysDetailList;
