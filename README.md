# react-native-date-picker-test

A simple, customizable and leightweight calendar date picker for react-native.

## Installation

```sh
$ npm i @maurofalcone/react-native-date-picker
```
or
```sh
$ yarn add @maurofalcone/react-native-date-picker
```

## Usage

```js
import React { useState } from "react"
import { DatePicker, DatePickerProps } from "@maurofalcone/react-native-date-picker"
const [selectedDate, setSelectedDate] = useState(new Date())
<MyDatePicker
    onDateChange={(selectedDate) => {
        setSelectedDate(selectedDate)
    }}
    maxDate={maxDate}
    minDate={minDate}
    selectedDate={
        new Date(selectedYear, selectedMonthIndex, selectedDay)
    }
/>
```

<!-- ## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow. -->

## License

MIT
