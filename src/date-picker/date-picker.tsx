import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { WEEK_DAYS } from "./constants";
import {
  dayHitSlop,
  getDaysInMonth,
  getDayToDisplay,
  isDisabled,
  isFunctionType,
} from "./helpers";
import {
  getDayContainerStyle,
  getDayFontStyle,
  getDayStyle,
  styles,
} from "./styles";
import { DatePickerProps, MappedDate, WeekDayType } from "./types";

const mappedDatesByDayNameInitialState: Record<WeekDayType, MappedDate[]> = {
  Sun: [],
  Mon: [],
  Tue: [],
  Wed: [],
  Thu: [],
  Fri: [],
  Sat: [],
};

export const DatePicker = ({
  dayStyle,
  maxDate,
  minDate,
  selectedDate,
  onDateChange,
  hideDiffMonthDays = false,
  hideHeader = false,
  weekDayStyle = {},
  renderCustomDay,
  renderCustomHeader,
  weekDayWrapperStyle,
  dayParentContainerStyle,
}: DatePickerProps) => {
  const [mappedDatesByDayName, setMappedDatesByDayName] = useState(
    mappedDatesByDayNameInitialState
  );

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
    <View style={styles.main}>
      {isFunctionType(renderCustomHeader) ? (
        renderCustomHeader!()
      ) : !hideHeader ? (
        <View style={styles.defaultHeader}>
          <Pressable
            onPress={() =>
              onDateChange(
                new Date(selectedDate.setMonth(selectedDate.getMonth() - 1))
              )
            }
          >
            <Text>{"<"}</Text>
          </Pressable>
          <Pressable>
            <Text>
              {selectedDate.toLocaleString("default", { month: "long" })}{" "}
            </Text>
          </Pressable>
          <Pressable>
            <Text>{selectedDate.getFullYear()}</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              onDateChange(
                new Date(selectedDate.setMonth(selectedDate.getMonth() + 1))
              )
            }
          >
            <Text>{">"}</Text>
          </Pressable>
        </View>
      ) : null}
      <View style={styles.calendar}>
        {WEEK_DAYS.map((wd) => (
          <View key={wd} style={styles.daysWrapper}>
            <View style={[styles.weekDay, weekDayWrapperStyle]}>
              <Text style={weekDayStyle}>{wd}</Text>
            </View>
            <View style={styles.day}>
              {mappedDatesByDayName[wd]?.map(
                ({ date, disabled, isSameMonth, isToday }) => {
                  const isSelected =
                    !isDisabled(selectedDate, minDate, maxDate) &&
                    selectedDate.toDateString() === date.toDateString();
                  return (
                    <View
                      key={date.toDateString()}
                      style={[
                        getDayContainerStyle(hideDiffMonthDays, isSameMonth),
                        dayParentContainerStyle?.day,
                        isSelected && dayParentContainerStyle?.selected,
                        disabled && dayParentContainerStyle?.disabled,
                        isToday && dayParentContainerStyle?.today,
                        !isSameMonth && dayParentContainerStyle?.diffMonth,
                      ]}
                    >
                      {isFunctionType(renderCustomDay) ? (
                        renderCustomDay!({
                          date,
                          isDisabled: disabled,
                          isSameMonth,
                          isSelected,
                          isToday,
                        })
                      ) : (
                        <Pressable
                          style={[
                            getDayStyle(
                              disabled,
                              isSelected,
                              isToday,
                              isSameMonth
                            ),
                            dayStyle?.dayWrapper,
                            isSelected && dayStyle?.selectedDayWrapper,
                            disabled && dayStyle?.disabledDayWrapper,
                            isToday && dayStyle?.todayWrapper,
                            !isSameMonth && dayStyle?.diffMonthDayWrapper,
                          ]}
                          onPress={() => !disabled && onDateChange(date)}
                          disabled={disabled || !isSameMonth}
                          hitSlop={dayHitSlop}
                        >
                          <Text
                            style={[
                              getDayFontStyle(
                                disabled,
                                isSelected,
                                isToday,
                                isSameMonth
                              ),
                              dayStyle?.dayText,
                              isSelected && dayStyle?.selectedDayText,
                              disabled && dayStyle?.disabledDayText,
                              isToday && dayStyle?.todayText,
                              !isSameMonth && dayStyle?.diffMonthDayText,
                            ]}
                          >
                            {getDayToDisplay(
                              date.getDate(),
                              hideDiffMonthDays,
                              isSameMonth
                            )}
                          </Text>
                        </Pressable>
                      )}
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
