import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import {
  getHabitsData,
  markDoneHabitData,
  removeAllHabitsData,
  removeHabitData,
  storeNewHabitData,
  updateHabitsData,
} from "../storage/habits";
import { IHabit, TNewHabit } from "../types/habit";
import { generateId } from "../utils/generateId";
import { generateTwoNextMonthInDays } from "../utils/generateTwoNextMonthInDays";
import { getTodayDate } from "../utils/getTodayDate";

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

  useEffect(() => {
    getAllHabits();
  }, []);

  const getAllHabits = async () => {
    try {
      const data = await getHabitsData();

      if (data !== null) {
        setState((prevState) => ({
          ...prevState,
          habits: [...data],
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getHabit = (id: string) => {
    setState((prevState) => ({ ...prevState, habit: undefined }));

    const searchHabit = state.habits.find((habit) => habit.id === id);

    searchHabit
      ? setState((prevState) => ({ ...prevState, habit: searchHabit }))
      : console.error("Error! Cannot find habit.");
  };

  const onCreateHabit = async (habit: TNewHabit) => {
    const randomId = generateId();
    const days = generateTwoNextMonthInDays();
    const today = getTodayDate("DashedString") as string;

    //mocked days
    // const mockDays = generateMockTwoNextMonthInDays();

    const newHabit: IHabit = {
      id: randomId,
      createdBy: today,
      name: habit.name,
      desc: habit.desc,
      icon: habit.icon,
      days: days,
      pomodore: habit.pomodore,
      pomodoreTime: habit.pomodoreTime,
      notification: habit.notification,
    };

    try {
      await storeNewHabitData(newHabit);
    } catch (error) {
      console.error(error);
    } finally {
      getAllHabits();
    }
  };

  const onUpdateHabits = async () => {
    if (!state.habits.length) {
      console.log("No habits there");
    } else {
      try {
        await updateHabitsData(state.habits);
      } catch (error) {
        console.error(error);
      } finally {
        getAllHabits();
      }
    }
  };

  const onMarkDoneToday = async (id: string) => {
    try {
      await markDoneHabitData(id, state.habits);
    } catch (error) {
      console.error(error);
    } finally {
      getAllHabits();
    }
  };

  const onDeleteHabit = async (id: string) => {
    try {
      await removeHabitData(id, state.habits);
    } catch (error) {
      console.error(error);
    } finally {
      getAllHabits();
    }
  };

  const onDeleteAllHabits = async () => {
    if (state.habits) {
      try {
        await removeAllHabitsData();
      } catch (error) {
        console.error(error);
      } finally {
        getAllHabits();
      }
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
