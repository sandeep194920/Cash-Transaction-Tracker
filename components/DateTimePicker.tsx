import { useState } from "react";
import { Button, SafeAreaView, Text } from "react-native";
// import {
//   DateTimePickerAndroid,
//   DateTimePickerEvent,
// } from "@react-native-community/datetimepicker";

import DateTimePicker from "@react-native-community/datetimepicker";
// export const DatePicker = () => {
//   const [date, setDate] = useState(new Date(1598051730000));

//   const onChange = (event: DateTimePickerEvent, selectedDate: any) => {
//     const currentDate = selectedDate;
//     setDate(currentDate);
//   };

//   const showMode = (currentMode: any) => {
//     DateTimePickerAndroid.open({
//       value: date,
//       onChange,
//       mode: currentMode,
//       is24Hour: true,
//     });
//   };

//   const showDatepicker = () => {
//     showMode("date");
//   };

//   const showTimepicker = () => {
//     showMode("time");
//   };

//   return (
//     <SafeAreaView>
//       <Button onPress={showDatepicker} title="Show date picker!" />
//       <Button onPress={showTimepicker} title="Show time picker!" />
//       <Text>selected: {date.toLocaleString()}</Text>
//     </SafeAreaView>
//   );
// };

export const DatePicker = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <SafeAreaView>
      <Button onPress={showDatepicker} title="Show date picker!" />
      {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          //   testID="dateTimePicker"
          value={date}
          mode={"date"}
          // is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};
