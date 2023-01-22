import { Platform } from "react-native";
import { IDay } from "../types/dayCell";

export const generateTwoNextMonthInDays = (): IDay[] => {
  const today = new Date();
  const tDay = today.getDate();
  const tMonth = today.toLocaleString("en-US", {
    month: "numeric",
  });
  const tYear = today.toLocaleString("default", {
    year: "numeric",
  });
  const startDate = `${tYear}/${tMonth}/${tDay}`;

  let days: IDay[] = [];

  let firstDay: IDay = {
    id: 0,
    date: startDate,
    status: "TODAY_TODO",
  };
  days.push(firstDay);

  for (let i = 1; i < 60; i++) {
    const next = new Date(today.setDate(today.getDate() + 1));
    const day = next.getDate();
    const month = next.getMonth() + 1;
    const year = next.getFullYear();

    const date = `${year}/${month}/${day}`;
    days.push({ id: i, date, status: "NEXT" });
  }

  return days;
};

export const generateMockTwoNextMonthInDays = (): IDay[] => {
  // SHORT DATE FORMAT MM/DD/YYYY
  let today = new Date("12/13/2022");
  let startDate = `12/13/202`;

  let days: IDay[] = [];

  let firstDay: IDay = {
    id: 0,
    date: startDate,
    status: "TODAY_TODO",
  };
  days.push(firstDay);

  for (let i = 1; i < 60; i++) {
    const next = new Date(today.setDate(today.getDate() + 1));
    const day = next.getDate();
    const month = next.toLocaleString("default", { month: "numeric" });
    const year = next.toLocaleString("default", { year: "numeric" });

    const date = `${month}/${day}/${year}`;

    days.push({ id: i, date, status: "NEXT" });
  }

  return days;
};
