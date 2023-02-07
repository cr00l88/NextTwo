import React, { useEffect, useState } from "react";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { Block, Text } from "./index";
import { MONTH_SHORT } from "../utils/monthsShort";
import { useHabitsContext } from "../hooks/useHabitsContext";
import DoneTodayCounterCircle from "./DoneTodayCounterCircle";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface ITodaySummaryBannerProps {
  habitsNum?: number;
}

const TodaySummaryBanner = ({ habitsNum }: ITodaySummaryBannerProps) => {
  const { colors } = useThemeStyles();
  const { habits } = useHabitsContext();

  const numOfDoneToday = habits.filter((habit) => habit.isDoneToday).length;
  const numOfHabits = habits.length;

  const todayDayName = days[new Date().getDay()];
  const dayNr = new Date().getDate();
  const monthShort = MONTH_SHORT[new Date().getMonth() + 1];
  const dayAndMonth = `${dayNr} ${
    monthShort.charAt(0).toUpperCase() + monthShort.slice(1)
  }`;

  return (
    <Block
      flex={1}
      row
      align="center"
      color={colors.black}
      paddingHorizontal={16}
      marginBottom={8}
      paddingVertical={12}
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.white,
      }}
    >
      <DoneTodayCounterCircle
        numOfDoneToday={numOfDoneToday}
        numOfHabits={numOfHabits}
      />

      <Block marginHorizontal={16}>
        <Text
          size={18}
          color={colors.white}
          style={{ fontFamily: "Unbounded-Regular" }}
          marginBottom={4}
        >
          {todayDayName}, {dayAndMonth}
        </Text>

        <Text
          size={13}
          color={colors.white}
          style={{ fontFamily: "Unbounded-Light" }}
        >
          ‘’Whatever you are, be a good one.’’{"\n"}
          <Text
            size={13}
            color={colors.gray}
            style={{ fontFamily: "Unbounded-Light" }}
          >
            - Abraham Lincoln
          </Text>
        </Text>
      </Block>
    </Block>
  );
};

export default TodaySummaryBanner;
