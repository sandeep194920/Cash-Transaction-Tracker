import { View, StyleSheet, Button } from 'react-native'
import React from 'react'
import { styleUtils } from '../../utils/styles'
import { useGlobalContext } from '../../utils/AppContext'

const WithCancelButton: React.FC = () => {
  const { toggleAddView, formik } = useGlobalContext()

  return (
    <View style={styleUtils.buttonContainer}>
      <Button onPress={() => formik.handleSubmit()} title="Add" />
      <Button title="Cancel" onPress={toggleAddView} />
    </View>
  )
}

export default WithCancelButton

const styles = StyleSheet.create({})
