import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from "react-native";
import {
  DatePickerProps,
  MappedDate,
  MissingDatesType,
  WeekDayType,
} from "./types";

const weekDays: Array<WeekDayType> = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const missingDates: MissingDatesType = {
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

const now = new Date();

const isDisabled = (date: Date, minDate?: Date, maxDate?: Date) => {
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

const getDaysInMonth = (
  year: number,
  monthIdx: number,
  minDate?: Date,
  maxDate?: Date
): Record<
  "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat",
  {
    date: Date;
    disabled: boolean;
    isSameMonth: boolean;
    isToday: boolean;
  }[]
> => {
  const firstDayOfMonth = new Date(year, monthIdx, 1);
  const firstDayOfMonthDay = weekDays[firstDayOfMonth.getDay()];
  const lastDayOfMonth = new Date(year, monthIdx + 1, 0);
  const lastDayOfMonthDay = weekDays[lastDayOfMonth.getDay()];
  const currentMonthDaysQty = new Date(year, monthIdx + 1, 0).getDate();

  const daysToLoop =
    missingDates[firstDayOfMonthDay].pastDates +
    currentMonthDaysQty +
    missingDates[lastDayOfMonthDay].nextDates;

  const dates: Record<
    string,
    {
      date: Date;
      disabled: boolean;
      isSameMonth: boolean;
      isToday: boolean;
    }[]
  > = {
    Sun: [],
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
  };
  const date = new Date(year, monthIdx, 1);

  if (missingDates[firstDayOfMonthDay]) {
    date.setDate(
      date.getDate() - missingDates[firstDayOfMonthDay].pastDates - 1
    );
    for (let i = 1; i <= daysToLoop; i++) {
      const newDate = new Date(date.setDate(date.getDate() + 1));
      const disabled = isDisabled(newDate, minDate, maxDate);
      const isToday = newDate?.toDateString() === now.toDateString();
      const isSameMonth = newDate?.getMonth() === monthIdx;
      const obj: {
        date: Date;
        disabled: boolean;
        isSameMonth: boolean;
        isToday: boolean;
      } = {
        date: newDate,
        disabled,
        isToday,
        isSameMonth,
      };
      dates[weekDays[obj.date.getDay()]].push(obj);
    }
  }
  return dates;
};

const getDayStyle = (
  isDisabled: boolean,
  isSelected: boolean,
  isToday: boolean,
  _isSameMonth: boolean
) => {
  return {
    width: 30,
    height: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: isSelected ? "#f50057" : "transparent",
    borderColor: isToday ? (isDisabled ? "gray" : "#f50057") : "transparent",
    borderRadius: 100,
    borderWidth: 1,
  };
};

const getDayContainerStyle = (
  hideDiffMonthDays: boolean,
  isSameMonth: boolean
) => {
  return {
    width: "100%",
    backgroundColor:
      !isSameMonth && !hideDiffMonthDays ? "#808080" : "transparent",
    justifyContent: "center",
    alignItems: "center",
  };
};

const getDayFontStyle = (
  isDisabled: boolean,
  isSelected: boolean,
  isToday: boolean,
  isSameMonth: boolean
) => {
  let color = "black";
  if (isSelected) {
    color = "white";
  }
  if (isDisabled) {
    color = "gray";
  }
  if (!isSelected && !isDisabled && isToday && isSameMonth) {
    color = "#f50057";
  }
  if (!isSameMonth) {
    color = "#AAAAAA";
  }
  return {
    color,
  };
};

export const DatePicker = ({
  maxDate,
  minDate,
  selectedDate = new Date(),
  onDateChange,
  hideDiffMonthDays = false,
  hideHeader = false,
  weekDayStyle = {},
}: DatePickerProps) => {
  const [mappedDatesByDayName, setMappedDatesByDayName] = useState<
    Record<WeekDayType, MappedDate[]>
  >({
    Sun: [],
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
  });

  useEffect(() => {
    if (selectedDate) {
      const result = getDaysInMonth(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        minDate,
        maxDate
      );
      setMappedDatesByDayName(() => result);
    }
  }, [selectedDate, maxDate, minDate]);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {!hideHeader && (
        <View
          style={{
            height: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              onDateChange(
                new Date(selectedDate.setMonth(selectedDate.getMonth() - 1))
              )
            }
          >
            <Text>{"<"}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>
              {selectedDate.toLocaleString("default", { month: "long" })}{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>{selectedDate.getFullYear()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              onDateChange(
                new Date(selectedDate.setMonth(selectedDate.getMonth() + 1))
              )
            }
          >
            <Text>{">"}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flex: 1,
        }}
      >
        {weekDays.map((wd) => (
          <View
            key={wd}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              flex: 1,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: "10%",
              }}
            >
              <Text style={weekDayStyle}>{wd}</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-around",
                height: "90%",
                paddingTop: 15,
              }}
            >
              {(mappedDatesByDayName[wd] as MappedDate[])?.map(
                ({ date, disabled, isSameMonth, isToday }) => {
                  const isSelected =
                    !isDisabled(selectedDate, minDate, maxDate) &&
                    selectedDate.toDateString() === date.toDateString();
                  return (
                    <View
                      key={date.toDateString()}
                      style={
                        getDayContainerStyle(
                          hideDiffMonthDays,
                          isSameMonth
                        ) as StyleProp<ViewStyle>
                      }
                    >
                      <TouchableOpacity
                        style={
                          getDayStyle(
                            disabled,
                            isSelected,
                            isToday,
                            isSameMonth
                          ) as any
                        }
                        onPress={() => !disabled && onDateChange(date)}
                        disabled={disabled || !isSameMonth}
                        hitSlop={{
                          top: 10,
                          left: 8,
                          right: 8,
                          bottom: 10,
                        }}
                      >
                        <Text
                          style={getDayFontStyle(
                            disabled,
                            isSelected,
                            isToday,
                            isSameMonth
                          )}
                        >
                          {!hideDiffMonthDays
                            ? date.getDate()
                            : isSameMonth
                            ? date.getDate()
                            : ""}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
