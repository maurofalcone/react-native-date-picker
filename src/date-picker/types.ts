import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type DatePickerProps = {
  /**
   * Use this prop if you want to customize the day instead of using a custom function to render the days.
   */
  dayStyle?: {
    dayWrapper?: StyleProp<ViewStyle>;
    dayText?: StyleProp<TextStyle>;
    selectedDayWrapper?: StyleProp<ViewStyle>;
    selectedDayText?: StyleProp<TextStyle>;
    disabledDayWrapper?: StyleProp<ViewStyle>;
    disabledDayText?: StyleProp<TextStyle>;
    todayWrapper?: StyleProp<ViewStyle>;
    todayText?: StyleProp<TextStyle>;
    diffMonthDayWrapper?: StyleProp<ViewStyle>;
    diffMonthDayText?: StyleProp<TextStyle>;
  };
  dayParentContainerStyle?: {
    day?: StyleProp<ViewStyle>;
    selected?: StyleProp<ViewStyle>;
    disabled?: StyleProp<ViewStyle>;
    today?: StyleProp<ViewStyle>;
    diffMonth?: StyleProp<ViewStyle>;
  };
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
  /**
   * Styles for week day name wrapper.
   */
  weekDayWrapperStyle?: StyleProp<TextStyle>;
  /**
   * A function to render each day. Hint: don't forget to handle the date change when using this function.
   */
  renderCustomDay?: (args: RenderCustomDayArgs) => JSX.Element;
  renderCustomHeader?: () => JSX.Element;
};

type RenderCustomDayArgs = {
  date: Date;
  isDisabled: boolean;
  isSameMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
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
