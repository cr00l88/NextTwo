import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useHabitsContext was used outside of its Provider");
  }

  return context;
};
