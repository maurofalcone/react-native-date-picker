import { StyleProp, TextStyle } from "react-native";

export type DatePickerProps = {
  /**
   * dates after maxDate will be disabled.
   */
  maxDate?: Date;
  /**
   * dates before minDate will be disabled.
   */
  minDate?: Date;
  /**
   * The selected date.
   */
  selectedDate: Date;
  /**
   * A function to set the selected date value. Receives the new date as parameter.
   */
  onDateChange: (selectedDate: Date) => void;
  /**
   * Set "hideDiffMonthDays" to true if you want to hide the previous and next days of the current month.
   */
  hideDiffMonthDays?: boolean;
  /**
   * Set "hideHeader" to true if you want to hide the default header component.
   */
  hideHeader?: boolean;
  /**
   * Overrides day name style.
   */
  weekDayStyle?: StyleProp<TextStyle>;
};

export interface MappedDate {
  date: Date;
  disabled: boolean;
  isSameMonth: boolean;
  isToday: boolean;
}

export type MissingDatesType = Record<
  string,
  {
    pastDates: number;
    nextDates: number;
  }
>;

export type WeekDayType = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
