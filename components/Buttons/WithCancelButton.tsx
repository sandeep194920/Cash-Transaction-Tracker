import { View, StyleSheet, Button } from 'react-native'
import React from 'react'
import { styleUtils } from '../../utils/styles'
import { useGlobalContext } from '../../utils/AppContext'
import { useRealmContext } from '../../utils/RealmContext'


interface WithCancelButtonProps {
  cancelHandler: () => void;
}

const WithCancelButton: React.FC<WithCancelButtonProps> = ({
  cancelHandler,
}) => {
  const { showCustomerModal } = useGlobalContext();
  const { addNewCustomerHandler } = useRealmContext();

  const addHandler = () => {
    addNewCustomerHandler();
    showCustomerModal(false);
  };

  return (
    <View style={styleUtils.buttonContainer}>
      <Button onPress={addHandler} title="Add" />
      <Button title="Cancel" onPress={cancelHandler} />
    </View>
  );
};

export default WithCancelButton

const styles = StyleSheet.create({})
