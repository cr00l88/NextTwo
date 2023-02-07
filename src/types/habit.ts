import { THabitIconType } from "../assets/icons/icons";
import { IDay } from "./dayCell";
import { TPomodoroTime } from "./pomodoro";

export interface IHabit {
  id: string;
  createdBy: string;
  name: string;
  desc?: string;
  icon: THabitIconType | "none";

  days: IDay[];
  isDoneToday?: boolean;

  pomodore: boolean;
  pomodoreTime: TPomodoroTime;

  notification: boolean;
}

export type TNewHabit = Pick<
  IHabit,
  "name" | "desc" | "icon" | "pomodore" | "pomodoreTime" | "notification"
> & { nameError: boolean };

export type THabitRow = Pick<
  IHabit,
  "id" | "name" | "pomodore" | "desc" | "icon" | "days"
>;

export type THabitDetailNavbar = Pick<IHabit, "icon" | "name" | "desc">;
