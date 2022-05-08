export const getDayStyle = (
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

export const getDayContainerStyle = (
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
    color = "#AAAAAA";
  }
  return {
    color,
  };
};
