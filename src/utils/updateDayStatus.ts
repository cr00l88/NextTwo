import { TDayCellType } from "../types/dayCell";
import { compareDateToToday } from "./compareDateToToday";

export const updateDayStatus = (
  date: string,
  status: TDayCellType
): TDayCellType => {
  const result = compareDateToToday(date);

  switch (result) {
    case "SAME":
      if (status !== "TODAY_SUCCESS") {
        return "TODAY_TODO";
      } else {
        return "TODAY_SUCCESS";
      }
    case "PAST":
      if (status === "TODAY_TODO" || status === "NEXT") {
        return "MISS";
      } else if (status === "TODAY_SUCCESS") {
        return "SUCCESS";
      }
    default:
      return status;
  }
};
