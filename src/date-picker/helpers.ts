import { MISSING_DATES_TO_REQUEST, NOW, WEEK_DAYS } from "./constants";
import { MappedDate, WeekDayType } from "./types";

export const getDaysInMonth = (
  year: number,
  monthIdx: number,
  minDate?: Date,
  maxDate?: Date
): Record<WeekDayType, MappedDate[]> => {
  const firstDayOfMonth = new Date(year, monthIdx, 1);
  const firstDayOfMonthDay = WEEK_DAYS[firstDayOfMonth.getDay()];
  const lastDayOfMonth = new Date(year, monthIdx + 1, 0);
  const lastDayOfMonthDay = WEEK_DAYS[lastDayOfMonth.getDay()];
  const currentMonthDaysQty = new Date(year, monthIdx + 1, 0).getDate();

  const daysToLoop =
    MISSING_DATES_TO_REQUEST[firstDayOfMonthDay].pastDates +
    currentMonthDaysQty +
    MISSING_DATES_TO_REQUEST[lastDayOfMonthDay].nextDates;

  const dates: Record<WeekDayType, MappedDate[]> = {
    Sun: [],
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
  };
  const date = new Date(year, monthIdx, 1);

  if (MISSING_DATES_TO_REQUEST[firstDayOfMonthDay]) {
    date.setDate(
      date.getDate() -
        MISSING_DATES_TO_REQUEST[firstDayOfMonthDay].pastDates -
        1
    );
    for (let i = 1; i <= daysToLoop; i++) {
      const newDate = new Date(date.setDate(date.getDate() + 1));
      const disabled = isDisabled(newDate, minDate, maxDate);
      const isToday = newDate?.toDateString() === NOW.toDateString();
      const isSameMonth = newDate?.getMonth() === monthIdx;
      const obj: MappedDate = {
        date: newDate,
        disabled,
        isToday,
        isSameMonth,
      };
      dates[WEEK_DAYS[obj.date.getDay()]].push(obj);
    }
  }
  return dates;
};

export const isDisabled = (date: Date, minDate?: Date, maxDate?: Date) => {
  if (maxDate && !minDate) {
    return date.getTime() > maxDate.getTime();
  }
  if (minDate && !maxDate) {
    return date.getTime() < minDate.getTime();
  }
  if (maxDate && minDate) {
    return (
      date.getTime() > maxDate.getTime() || date.getTime() < minDate.getTime()
    );
  }
  return false;
};

export const getDayToDisplay = (
  dayNumber: number,
  hideDiffMonthDays: boolean,
  isSameMonth: boolean
) => {
  if (!hideDiffMonthDays || isSameMonth) {
    return dayNumber;
  }
  return "";
};

export const isFunctionType = (arg: any) => typeof arg === "function";

export const dayHitSlop = {
  top: 10,
  left: 8,
  right: 8,
  bottom: 10,
};
