import { THabitIconType } from "../assets/icons/icons";
import { IDay } from "./dayCell";

export interface IHabit {
  id: string;
  createdBy: string;
  name: string;
  desc?: string;
  icon: THabitIconType | "none";

  days: IDay[];
  isDoneToday?: boolean;

  pomodore: boolean;
  pomodoreTime: "15" | "30" | "60" | "120";

  notification: boolean;
}

export type TNewHabit = Pick<
  IHabit,
  "name" | "desc" | "icon" | "pomodore" | "pomodoreTime" | "notification"
>;

export type THabitRow = Pick<IHabit, "id" | "name" | "desc" | "icon" | "days">;
