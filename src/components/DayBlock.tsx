import React from "react";
import { IDay, TDayCellType } from "../types/dayCell";
import { Block, Text, Icon } from ".";

import { useThemeStyles } from "../hooks/useThemeStyles";
import { TSystemIconType } from "../assets/icons/icons";
import { MONTH_SHORT } from "../utils/monthsShort";
import { Platform } from "react-native";

interface IDayCellProps {
  text: string;
  frame: string;
  icon: TSystemIconType;
  border: boolean;
}

interface IDayBlockProps {
  day: IDay;
  width: string;
}

const DayBlock = ({ day, width }: IDayBlockProps) => {
  const { colors } = useThemeStyles();

  const DAY_CELL: Record<TDayCellType, IDayCellProps> = {
    MISS: {
      text: colors.white,
      frame: colors.black,
      icon: "dayCell_miss",
      border: false,
    },
    NEXT: {
      text: colors.black,
      frame: colors.lightGray,
      icon: "arrowRight",
      border: false,
    },
    SUCCESS: {
      text: colors.white,
      frame: colors.black,
      icon: "dayCell_success",
      border: false,
    },
    TODAY_SUCCESS: {
      text: colors.black,
      frame: colors.white,
      icon: "dayCell_success",
      border: true,
    },
    TODAY_TODO: {
      text: colors.black,
      frame: colors.white,
      icon: "dayCell_todo",
      border: true,
    },
  };

  const shortMonth = () => MONTH_SHORT[day.date.split("/")[1]];

  return (
    <Block
      key={day.id.toString()}
      align="center"
      marginVertical={2}
      paddingVertical={4}
      color={DAY_CELL[day.status].frame}
      style={[
        { width, borderRadius: 4 },
        DAY_CELL[day.status].border && {
          borderWidth: 2,
          borderColor: colors.black,
        },
      ]}
    >
      <Text size={20} color={DAY_CELL[day.status].text}>
        {day.date.split("/")[2]}
      </Text>
      <Text
        size={14}
        color={DAY_CELL[day.status].text}
        style={{ textTransform: "uppercase" }}
      >
        {shortMonth()}
      </Text>
      <Icon
        icon={DAY_CELL[day.status].icon}
        color={DAY_CELL[day.status].text}
      />
    </Block>
  );
};

export default DayBlock;
