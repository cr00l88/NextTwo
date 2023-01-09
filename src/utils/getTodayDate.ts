type TFormatDate = "Object" | "DashedString";

export const getTodayDate = (format: TFormatDate) => {
  const today = new Date();

  const todayDate = {
    day: today.toLocaleString("en-US", { day: "2-digit" }),
    month: today.toLocaleString("en-US", { month: "numeric" }),
    year: today.toLocaleString("en-US", { year: "numeric" }),
  };

  if (format === "DashedString") {
    return `${todayDate.day}-${todayDate.month}-${todayDate.year}`;
  } else if (format === "Object") {
    return today;
  }
};
