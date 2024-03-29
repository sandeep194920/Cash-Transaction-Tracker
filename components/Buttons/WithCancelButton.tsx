import { View, StyleSheet, Button } from 'react-native'
import React from 'react'
import { styleUtils } from '../../utils/styles'
import { useGlobalContext } from '../../utils/AppContext'
import { useRealmContext } from '../../utils/RealmContext'

const WithCancelButton: React.FC = () => {
  const { toggleAddView } = useGlobalContext()
  const { formikAddCustomer } = useRealmContext()

  return (
    <View style={styleUtils.buttonContainer}>
      <Button onPress={() => formikAddCustomer.handleSubmit()} title="Add" />
      <Button title="Cancel" onPress={toggleAddView} />
    </View>
  )
}

export default WithCancelButton

const styles = StyleSheet.create({})
