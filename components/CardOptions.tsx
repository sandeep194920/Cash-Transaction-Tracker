import { StyleSheet, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors, dimensions } from "../utils/styles";

interface CardOptionsProps {
  hideOption: () => void;
  deleteOption: () => void;
}

const CardOptions: React.FC<CardOptionsProps> = ({
  hideOption,
  deleteOption,
}) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="trash-sharp"
        size={20}
        color={colors.red}
        onPress={deleteOption}
      />
      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.darkGray1}
        onPress={hideOption}
      />
    </View>
  );
};

export default CardOptions;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: dimensions.paddingSmall3,
    justifyContent: "space-evenly",
  },
});
