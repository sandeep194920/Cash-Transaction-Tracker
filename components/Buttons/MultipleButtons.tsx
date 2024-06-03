import { View, StyleSheet } from "react-native";
import { ButtonType } from "../../utils/types";
import Button from "./Button";

interface Buttons {
  buttons: ButtonType[];
  width?: number;
}

const MultipleButtons = ({ buttons, width = 80 }: Buttons) => {
  return (
    <View
      style={{
        ...styles.buttonContainer,
        ...(width && { width: `${width}%` }),
      }}
    >
      {buttons.map((button) => {
        return <Button key={button.title} {...button} />;
      })}
    </View>
  );
};

export default MultipleButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
    gap: 40,
  },
});
