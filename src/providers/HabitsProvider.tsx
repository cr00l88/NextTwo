import React, { createContext, PropsWithChildren, useState } from "react";
import { IDay } from "../types/dayCell";
import { IHabit, TNewHabit } from "../types/habit";
import { generateId } from "../utils/generateId";
import {
  generateMockTwoNextMonthInDays,
  generateTwoNextMonthInDays,
} from "../utils/generateTwoNextMonthInDays";
import { updateDayStatus } from "../utils/updateDayStatus";

interface IHabitsContextState {
  habits: IHabit[];
  habit?: IHabit;
  getHabit: (id: string) => void;
  onCreateHabit: (habit: TNewHabit) => void;
  onUpdateHabits: () => void;
  onMarkDoneToday: (id: string) => void;
  onDeleteHabit: (id: string) => void;
  onDeleteAllHabits: () => void;
}

const initialState: IHabitsContextState = {
  habits: [],
  getHabit: () => {},
  onCreateHabit: () => {},
  onUpdateHabits: () => {},
  onMarkDoneToday: () => {},
  onDeleteHabit: () => {},
  onDeleteAllHabits: () => {},
};

export const HabitsContext = createContext<IHabitsContextState>(initialState);

const HabitsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<IHabitsContextState>(initialState);

  const getHabit = (id: string) => {
    setState((prevState) => ({ ...prevState, habit: undefined }));

    const searchHabit = state.habits.find((habit) => habit.id === id);

    searchHabit
      ? setState((prevState) => ({ ...prevState, habit: searchHabit }))
      : console.error("Error! Cannot find habit.");
  };

  const onCreateHabit = (habit: TNewHabit) => {
    const randomId = generateId();
    const days = generateTwoNextMonthInDays();

    //mocked days
    const mockDays = generateMockTwoNextMonthInDays();

    const newHabit: IHabit = {
      id: randomId,
      createdBy: "Today",
      name: habit.name,
      desc: habit.desc,
      icon: habit.icon,
      days: mockDays,
      pomodore: habit.pomodore,
      pomodoreTime: habit.pomodoreTime,
      notification: habit.notification,
    };

    setState((prevState) => ({
      ...prevState,
      habits: [...prevState.habits, newHabit],
    }));
  };

  const onUpdateHabits = () => {
    if (!state.habits.length) {
      console.log("No habits there");
    } else {
      const updatedHabits = state.habits.map((habit) => ({
        ...habit,
        days: [
          ...habit.days.map(
            (day) =>
              ({
                ...day,
                status: updateDayStatus(day.date, day.status),
              } as IDay)
          ),
        ],
      }));

      setState((prevState) => ({
        ...prevState,
        habits: [...updatedHabits],
      }));
    }
  };

  const onMarkDoneToday = (id: string) => {
    const updatedHabits = state.habits.map((habit) =>
      habit.id === id
        ? {
            ...habit,
            days: [
              ...habit.days.map((day) =>
                day.status === "TODAY_TODO"
                  ? ({ ...day, status: "TODAY_SUCCESS" } as IDay)
                  : day
              ),
            ],
          }
        : habit
    );

    // const searchHabit = updatedHabits.find((habit) => habit.id === id);

    setState((prevState) => ({
      ...prevState,
      habits: [...updatedHabits],
      // habit: searchHabit,
    }));

    getHabit(id);
  };

  const onDeleteHabit = (id: string) => {
    const updatedHabits = state.habits.filter((habit) => {
      if (habit.id !== id) {
        return habit;
      }
    });

    setState((prevState) => ({
      ...prevState,
      habits: [...updatedHabits],
    }));
  };

  const onDeleteAllHabits = () => {
    if (state.habits) {
      setState((prevState) => ({
        ...prevState,
        habits: [],
      }));
      console.log("Success! Habits deleted.");
    } else {
      console.log("No habits there.");
    }
  };

  const userState: IHabitsContextState = {
    habits: state.habits,
    habit: state.habit,
    getHabit,
    onCreateHabit,
    onUpdateHabits,
    onMarkDoneToday,
    onDeleteHabit,
    onDeleteAllHabits,
  };

  return (
    <HabitsContext.Provider value={userState}>
      {children}
    </HabitsContext.Provider>
  );
};

export default HabitsProvider;
