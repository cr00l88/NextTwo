import React from "react";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { IPomodoro } from "../types/pomodoro";
import { Block, Text, Button, Icon } from "./";

interface IHabitStats {
  dayNumber: number;
  progressNumber: number;
  pomodoro?: IPomodoro;
}
const HabitStats = ({ dayNumber, progressNumber, pomodoro }: IHabitStats) => {
  const { colors } = useThemeStyles();
  return (
    <Block marginVertical={8}>
      <Block row>
        <Block
          flex={1}
          border
          // color={colors.black}
          align="center"
          paddingVertical={12}
          style={{ borderRadius: 4 }}
          marginRight={4}
        >
          <Text size={14} marginBottom={4}>
            STREAK
          </Text>
          <Text
            size={20}
            color={colors.black}
            style={{ fontFamily: "Unbounded-Regular" }}
          >
            {dayNumber}
          </Text>
        </Block>

        <Block
          flex={1}
          border
          color={colors.white}
          align="center"
          paddingVertical={12}
          style={{ borderRadius: 4 }}
          marginLeft={4}
        >
          <Text size={14} marginBottom={4}>
            PROGRESS
          </Text>
          <Text
            size={20}
            color={colors.black}
            style={{ fontFamily: "Unbounded-Regular" }}
          >
            {progressNumber}
            <Text
              size={14}
              color={colors.gray}
              style={{ fontFamily: "Unbounded-Light" }}
            >
              /60
            </Text>
          </Text>
        </Block>
      </Block>
      {pomodoro.isActive && (
        <Block
          row
          border
          justify="space-between"
          align="center"
          marginTop={8}
          paddingHorizontal={12}
          paddingVertical={16}
          style={{ borderRadius: 4 }}
        >
          <Block row align="center">
            <Icon icon="pomodoro" color={colors.black} marginRight={8} />
            <Text h4 color={colors.black}>
              {pomodoro.time + " min"}
            </Text>
          </Block>

          <Button
            onPress={() => console.log("Edit pomodoro time")}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text color={colors.black}>Edit</Text>
            <Icon icon="arrowRight" color={colors.black} />
          </Button>
        </Block>
      )}
    </Block>
  );
};

export default HabitStats;
