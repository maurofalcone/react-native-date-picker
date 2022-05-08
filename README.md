# react-native-date-picker [WIP]

A simple, customizable and lightweight calendar date picker for react-native.

## Installation

```sh
npm i @maurofalcone/react-native-date-picker
```

or

```sh
yarn add @maurofalcone/react-native-date-picker
```

## Usage

```js
import React, { useState } from "react"
import { DatePicker, DatePickerProps } from "@maurofalcone/react-native-date-picker"

const [selectedDate, setSelectedDate] = useState(new Date())

<DatePicker
   onDateChange={(selectedDate) => {
     setSelectedDate(selectedDate)
   }}
   maxDate={maxDate}
   minDate={minDate}
   selectedDate={selectedDate}
/>
```

<!-- ## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow. -->

## License

MIT
