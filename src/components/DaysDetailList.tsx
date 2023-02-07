import { FlatList } from "react-native";
import { Block, Text, Icon } from "./";
import { IDay, TDayCellType } from "../types/dayCell";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { MONTH_SHORT } from "../utils/monthsShort";
import { TSystemIconType } from "../assets/icons/icons";

interface IDayCellProps {
  text: string;
  frame: string;
  icon: TSystemIconType;
}

interface IDaysDetailListProps {
  days: IDay[];
  colNums?: number;
}

const DaysDetailList = ({ days, colNums = 6 }: IDaysDetailListProps) => {
  const { colors } = useThemeStyles();

  const CELL_WIDTH = `${Math.floor(100 / colNums)}%`;

  const DAY_CELL: Record<TDayCellType, IDayCellProps> = {
    MISS: {
      text: colors.white,
      frame: colors.black,
      icon: "dayCell_miss",
    },
    NEXT: {
      text: colors.black,
      frame: colors.lightGray,
      icon: "arrowRight",
    },
    SUCCESS: {
      text: colors.white,
      frame: colors.black,
      icon: "dayCell_success",
    },
    TODAY_SUCCESS: {
      text: colors.white,
      frame: "purple",
      icon: "dayCell_success",
    },
    TODAY_TODO: {
      text: colors.black,
      frame: colors.white,
      icon: "dayCell_todo",
    },
  };

  const renderItem = ({ item }: { item: IDay }) => (
    <Block
      // flex={1}
      align="center"
      margin={4}
      paddingVertical={8}
      color={DAY_CELL[item.status].frame}
      style={[
        { width: "14%", borderRadius: 4 },
        item.status === "TODAY_TODO" && {
          borderWidth: 2,
          borderColor: "black",
        },
      ]}
    >
      <Text weight="600" size={20} color={DAY_CELL[item.status].text}>
        {item.date.split("/")[2]}
      </Text>
      <Text size={14} color={DAY_CELL[item.status].text}>
        {MONTH_SHORT[item.date.split("/")[1]].toUpperCase()}
      </Text>
      <Icon
        icon={DAY_CELL[item.status].icon}
        color={DAY_CELL[item.status].text}
      />
    </Block>
  );

  const dayBlock = (day: IDay) => (
    <Block
      // flex={1}
      key={day.id.toString()}
      align="center"
      marginVertical={2}
      paddingVertical={4}
      color={DAY_CELL[day.status].frame}
      style={[
        { width: CELL_WIDTH, borderRadius: 4 },
        day.status === "TODAY_TODO" && {
          borderWidth: 2,
          borderColor: "black",
        },
      ]}
    >
      <Text weight="600" size={20} color={DAY_CELL[day.status].text}>
        {day.date.split("/")[2]}
      </Text>
      <Text size={14} color={DAY_CELL[day.status].text}>
        {MONTH_SHORT[day.date.split("/")[1]].toUpperCase()}
      </Text>
      <Icon
        icon={DAY_CELL[day.status].icon}
        color={DAY_CELL[day.status].text}
      />
    </Block>
  );

  // return (
  //   <FlatList
  //     // nestedScrollEnabled
  //     ListHeaderComponent={header}
  //     numColumns={colNums}
  //     columnWrapperStyle={{ justifyContent: "space-between" }}
  //     contentContainerStyle={{ paddingVertical: 16 }}
  //     data={days}
  //     renderItem={renderItem}
  //     keyExtractor={(item) => item.id.toString()}
  //   />
  // );

  return (
    <Block
      marginVertical={16}
      paddingBottom={8}
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {days.map((day, index) => dayBlock(day))}
    </Block>
  );
};

export default DaysDetailList;
