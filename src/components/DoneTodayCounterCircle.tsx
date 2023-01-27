import React from "react";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { Block, Text } from "./index";

const CIRCLE_SIZE = 54;

interface IDoneTodayCounterCircleProps {
  numOfDoneToday: number;
  numOfHabits: number;
}

const DoneTodayCounterCircle = ({
  numOfDoneToday,
  numOfHabits,
}: IDoneTodayCounterCircleProps) => {
  const { colors } = useThemeStyles();

  const ifAllDoneToday = numOfDoneToday === numOfHabits;

  if (ifAllDoneToday) {
    return (
      <Block
        justify="center"
        align="center"
        color={colors.white}
        style={{
          borderColor: colors.white,
          borderWidth: 2,
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
          borderRadius: CIRCLE_SIZE / 2,
        }}
      >
        <Text
          size={14}
          color={colors.black}
          style={{ fontFamily: "Unbounded-Regular" }}
        >
          Done
        </Text>
      </Block>
    );
  } else {
    return (
      <Block
        justify="center"
        align="center"
        style={{
          borderColor: colors.white,
          borderWidth: 2,
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
          borderRadius: CIRCLE_SIZE / 2,
        }}
      >
        <Text
          size={20}
          color={colors.white}
          style={{ fontFamily: "Unbounded-Light" }}
        >
          {numOfDoneToday}
          <Text
            size={14}
            color={colors.gray}
            style={{ fontFamily: "Unbounded-Light" }}
          >
            /{numOfHabits}
          </Text>
        </Text>
      </Block>
    );
  }
};

export default DoneTodayCounterCircle;
