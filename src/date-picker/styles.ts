import { StyleProp, StyleSheet, ViewStyle } from "react-native";

export const styles = StyleSheet.create({
  defaultHeader: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  main: {
    width: "100%",
    height: "100%",
  },
  calendar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  daysWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flex: 1,
  },
  weekDay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
  },
  day: {
    flexDirection: "column",
    justifyContent: "space-around",
    height: "90%",
    paddingTop: 15,
  },
});

export const getDayStyle = (
  isDisabled: boolean,
  isSelected: boolean,
  isToday: boolean,
  _isSameMonth: boolean
): StyleProp<ViewStyle> => {
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

export const getDayContainerStyle = (
  hideDiffMonthDays: boolean,
  isSameMonth: boolean
): StyleProp<ViewStyle> => {
  return {
    width: "100%",
    backgroundColor:
      !isSameMonth && !hideDiffMonthDays ? "#AAAAAA" : "transparent",
    justifyContent: "center",
    alignItems: "center",
  };
};

export const getDayFontStyle = (
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
    color = "white";
  }
  return {
    color,
  };
};
