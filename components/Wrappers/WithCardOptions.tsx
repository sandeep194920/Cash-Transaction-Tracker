import { StyleSheet, View, ViewStyle } from "react-native";
import React, { PropsWithChildren } from "react";
import CardOptions from "../CardOptions";

type WithCardOptionsT = {
  containerDirection?: ViewStyle["flexDirection"]; // This can be 'row' | 'row-reverse' | 'column' | 'column-reverse' and so on. Instead of typing it manually I can use existing props from ViewStyle
  optionsDirection?: ViewStyle["flexDirection"];
};

const WithCardOptions: React.FC<PropsWithChildren<WithCardOptionsT>> = ({
  children,
  containerDirection = "row",
  optionsDirection = "row",
}) => {
  const dynamicStyles = {
    flex: 1,
    flexDirection: containerDirection,
  };

  return (
    <View style={dynamicStyles}>
      {children}
      <CardOptions
        direction={optionsDirection}
        hideOption={() => {}}
        deleteOption={() => {}}
      />
    </View>
  );
};

export default WithCardOptions;

const styles = StyleSheet.create({});
