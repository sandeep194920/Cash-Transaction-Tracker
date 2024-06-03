import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ButtonType } from "../../utils/types";
import { colors } from "../../utils/styles";

const Button = ({
  title,
  color = "white",
  bgColor = "transparent",
  borderRadius = "rounded",
  noBorder = false,
  onPress = () => {},
}: ButtonType) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...styles.buttonContainer,

        // conditionally rendering as this is an optional prop
        ...(bgColor !== "transparent"
          ? { backgroundColor: colors[bgColor] }
          : { borderWidth: 0.5, borderColor: colors[color] }),

        // this can also be written just as borderColor with es6 syntax
        borderRadius: borderRadius === `semi-rounded` ? 4 : 20,
        ...(noBorder && { backgroundColor: "transparent", borderWidth: 0 }),
      }}
    >
      <Text style={{ color: colors[color], fontWeight: "600" }}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 18,
    paddingVertical: 7,
  },
});
