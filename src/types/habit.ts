import { IDay } from "./dayCell";
import { TIcon } from "./icon";

export interface IHabit {
  id: string;
  createdBy: string;
  name: string;
  desc?: string;
  icon: TIcon | "none";

  days: IDay[];

  pomodore: boolean;
  pomodoreTime: "15" | "30" | "60" | "120";

  notification: boolean;
}

export type TNewHabit = Pick<
  IHabit,
  "name" | "desc" | "icon" | "pomodore" | "pomodoreTime" | "notification"
>;

export type THabitRow = Pick<IHabit, "id" | "name" | "desc" | "icon" | "days">;
