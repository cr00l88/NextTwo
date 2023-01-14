import { IDay } from "../types/dayCell";
import { IHabit } from "../types/habit";
import { updateDayStatus } from "../utils/updateDayStatus";
import { getJSONData, removeData, storeJSONData } from "./storage";

const KEY = "@habits";

export const storeHabitsData = async (habits: IHabit[]) => {
  try {
    await storeJSONData(KEY, habits);
  } catch (error) {
    console.error(error);
  }
};

export const storeNewHabitData = async (habit: IHabit) => {
  try {
    const data = (await getJSONData(KEY)) as IHabit[];
    if (data !== null) {
      const updatedData = [...data, habit];
      await storeJSONData(KEY, updatedData);
    } else {
      await storeJSONData(KEY, [habit]);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getHabitsData = async () => {
  try {
    const data = (await getJSONData(KEY)) as IHabit[];
    if (data !== null) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateHabitsData = async (habits: IHabit[]) => {
  try {
    const updatedHabits = habits.map((habit) => ({
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
    console.log(updatedHabits);
    await storeHabitsData(updatedHabits);
  } catch (error) {
    console.error(error);
  }
};

export const markDoneHabitData = async (id: string, habits: IHabit[]) => {
  try {
    const updatedHabits = habits.map((habit) =>
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

    await storeHabitsData(updatedHabits);
  } catch (error) {
    console.error(error);
  }
};

export const removeAllHabitsData = async () => {
  try {
    await storeHabitsData([]);
  } catch (error) {
    console.error(error);
  }
};

export const removeHabitData = async (id: string, habits: IHabit[]) => {
  const updatedHabits = habits.filter((habit) => {
    if (habit.id !== id) {
      return habit;
    }
  });

  try {
    await storeHabitsData(updatedHabits);

    return updatedHabits;
  } catch (error) {
    console.error(error);
  }
};
