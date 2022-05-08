import { MissingDatesType, WeekDayType } from "./types";

export const WEEK_DAYS: Array<WeekDayType> = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export const MISSING_DATES_TO_REQUEST: MissingDatesType = {
  Sun: {
    pastDates: 0,
    nextDates: 6,
  },
  Mon: {
    pastDates: 1,
    nextDates: 5,
  },
  Tue: {
    pastDates: 2,
    nextDates: 4,
  },
  Wed: {
    pastDates: 3,
    nextDates: 3,
  },
  Thu: {
    pastDates: 4,
    nextDates: 2,
  },
  Fri: {
    pastDates: 5,
    nextDates: 1,
  },
  Sat: {
    pastDates: 6,
    nextDates: 0,
  },
};

export const NOW = new Date();
