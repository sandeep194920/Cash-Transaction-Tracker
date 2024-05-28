import { View, StyleSheet, Button } from 'react-native'
import React from 'react'
import { styleUtils } from "../../utils/styles";

interface WithCancelButtonProps {
  onPressHandler: () => void;
  onCancelHandler: () => void;
}

const WithCancelButton: React.FC<WithCancelButtonProps> = ({
  onPressHandler,
  onCancelHandler,
}) => {
  return (
    <View style={styleUtils.buttonContainer}>
      <Button onPress={onPressHandler} title="Add" />
      <Button title="Cancel" onPress={onCancelHandler} />
    </View>
  );
};

export default WithCancelButton

const styles = StyleSheet.create({})
