type TFormatDate = "Object" | "SlashString";

export const getTodayDate = (format: TFormatDate) => {
  const today = new Date();

  const todayDate = {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  };

  if (format === "SlashString") {
    return `${todayDate.day}/${todayDate.month}/${todayDate.year}`;
  } else if (format === "Object") {
    return today;
  }
};
