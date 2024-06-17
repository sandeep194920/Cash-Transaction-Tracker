import { useState } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import { colors, styleUtils } from "../utils/styles";

const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    selectedDate && setDate(selectedDate);
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <SafeAreaView>
      <Text style={styleUtils.headerText}>Add Transaction</Text>
      <View
        style={{
          ...styleUtils.itemRowContainer,
          marginTop: 12,
          justifyContent: "space-evenly",
        }}
      >
        {show ? (
          <DateTimePicker value={date} onChange={onChange} />
        ) : (
          <>
            <Text>{date.toDateString()}</Text>
            <Feather
              onPress={showMode}
              name="edit"
              size={20}
              color={colors.lightBlue1}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DatePicker;

const styles = StyleSheet.create({});
