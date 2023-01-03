import { useContext } from "react";
import { HabitsContext } from "../providers/HabitsProvider";

export const useHabitsContext = () => {
  const context = useContext(HabitsContext);

  if (context === undefined) {
    throw new Error("useHabitsContext was used outside of its Provider");
  }

  return context;
};
