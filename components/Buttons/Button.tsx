import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

type ButtonT = {
  title: string;
  color: string;
  bgColor?: string; // optional prop
  borderRadius?: "semi-rounded" | "rounded"; // mandatory prop
};

const Button = ({
  title,
  color,
  bgColor,
  borderRadius = "rounded",
}: ButtonT) => {
  return (
    <Pressable
      style={{
        ...styles.buttonContainer,

        // conditionally rendering as this is an optional prop
        ...(bgColor && { backgroundColor: bgColor }),

        // this can also be written just as borderColor with es6 syntax
        borderRadius: borderRadius === `semi-rounded` ? 4 : 20,
      }}
    >
      <Text style={{ color, fontWeight: "600" }}>{title}</Text>
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
