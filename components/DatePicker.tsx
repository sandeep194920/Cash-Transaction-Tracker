import { useState } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import { colors, dimensions, styleUtils } from "../utils/styles";
import { formatDate } from "../utils/formatDate";

interface DateProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DatePicker = ({ date, setDate }: DateProps) => {
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    selectedDate && setDate(selectedDate);
  };

  const showMode = () => {
    setShow(true);
  };

  const { date: formattedDate, day } = formatDate(date);

  return (
    <SafeAreaView>
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
          <View style={styleUtils.itemRowContainer}>
            <Text
              style={{
                ...styleUtils.headerText,
                fontSize: dimensions.largeFont,
              }}
            >
              {formattedDate}
            </Text>
            <Text style={styleUtils.smallText}>({day}) </Text>

            <Feather
              onPress={showMode}
              name="edit"
              size={20}
              color={colors.darkGray1}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DatePicker;

const styles = StyleSheet.create({});
