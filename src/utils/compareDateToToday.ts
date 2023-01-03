type TCompateDatesResult = "SAME" | "PAST" | "FUTURE";

export const compareDateToToday = (
  dateToCompare: string
): TCompateDatesResult => {
  const today = new Date();
  const date = new Date(dateToCompare);

  if (checkIfSameDay(today, date)) {
    return "SAME";
  }

  if (today < date) {
    return "FUTURE";
  } else if (today > date) {
    return "PAST";
  } else {
    return "SAME";
  }
};

const checkIfSameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();
