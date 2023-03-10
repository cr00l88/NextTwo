import { IHabit, TNewHabit } from "../types/habit";

export type TCreateHabitFormUpdateType =
  | "name"
  | "desc"
  | "pomodoreTime"
  | "icon";
export type TCreateHabitFormToggleType = "pomodore" | "notification";

type TCreateHabitFormAction =
  | {
      type: "UPDATE";
      payload: {
        key: TCreateHabitFormUpdateType;
        value: string;
      };
    }
  | {
      type: "TOGGLE";
      payload: {
        key: TCreateHabitFormToggleType;
      };
    }
  | {
      type: "SET_ERROR";
      payload: {
        key: string;
      };
    }
  | {
      type: "CLEAR_ERROR";
      payload: {
        key: string;
      };
    };

export const createHabitFormInitialState: TNewHabit = {
  name: "Working",
  nameError: false,
  desc: "",
  icon: "none",
  pomodore: false,
  pomodoreTime: "15",
  notification: false,
};

export const createHabitFormReducer = (
  state: TNewHabit,
  action: TCreateHabitFormAction
): TNewHabit => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "TOGGLE":
      return {
        ...state,
        [action.payload.key]: !state[action.payload.key],
      };
    case "SET_ERROR":
      return {
        ...state,
        [action.payload.key]: true,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        [action.payload.key]: false,
      };

    default:
      throw new Error("Unknown action type");
  }
};
