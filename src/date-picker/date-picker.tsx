import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from "react-native";
import { WEEK_DAYS } from "./constants";
import { getDaysInMonth, getDayToDisplay, isDisabled } from "./helpers";
import { getDayContainerStyle, getDayFontStyle, getDayStyle } from "./styles";
import { DatePickerProps, MappedDate, WeekDayType } from "./types";

export const DatePicker = ({
  maxDate,
  minDate,
  selectedDate,
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
        {WEEK_DAYS.map((wd) => (
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
                          {getDayToDisplay(
                            date.getDate(),
                            hideDiffMonthDays,
                            isSameMonth
                          )}
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
