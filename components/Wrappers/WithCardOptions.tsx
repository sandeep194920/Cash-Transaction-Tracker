import { StyleSheet, View, ViewStyle } from "react-native";
import React, { PropsWithChildren, useState } from "react";
import CardOptions from "../CardOptions";

type WithCardOptionsT = {
  containerDirection?: ViewStyle["flexDirection"]; // This can be 'row' | 'row-reverse' | 'column' | 'column-reverse' and so on. Instead of typing it manually I can use existing props from ViewStyle
  optionsDirection?: ViewStyle["flexDirection"];
  onDeleteOption: () => void;
  onEditOption: () => void;
  onHideOption: () => void;
  showCardOptions: boolean;
};

const WithCardOptions: React.FC<PropsWithChildren<WithCardOptionsT>> = ({
  children,
  containerDirection = "row",
  optionsDirection = "row",
  onDeleteOption,
  onEditOption,
  onHideOption,
  showCardOptions,
}) => {
  const dynamicStyles = {
    flex: 1,
    flexDirection: containerDirection,
  };

  // const [showOptions, setShowOptions] = useState(false);

  return (
    <View style={dynamicStyles}>
      {children}
      {showCardOptions && (
        <CardOptions
          direction={optionsDirection}
          deleteOption={onDeleteOption}
          editOption={onEditOption}
          hideOption={onHideOption}
        />
      )}
    </View>
  );
};

export default WithCardOptions;

const styles = StyleSheet.create({});
