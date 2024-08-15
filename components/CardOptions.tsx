import { StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors, dimensions } from "../utils/styles";

interface CardOptionsProps {
  hideOption: () => void;
  deleteOption: () => void;
  direction?: ViewStyle["flexDirection"];
}

const CardOptions: React.FC<CardOptionsProps> = ({
  hideOption,
  deleteOption,
  direction = "row",
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: direction,
          ...(direction === "row"
            ? { paddingHorizontal: dimensions.paddingSmall3 }
            : {
                paddingVertical: dimensions.paddingSmall1,
                paddingHorizontal: dimensions.paddingSmall2,
              }),
        },
      ]}
    >
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
    justifyContent: "space-between",
    marginHorizontal: dimensions.smallGap,
  },
});
