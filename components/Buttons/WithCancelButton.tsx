import { View, StyleSheet, Button } from 'react-native'
import React from 'react'
import { styleUtils } from '../../utils/styles'
import { WithCancelButtonType } from '../../utils/types'
import { useGlobalContext } from '../../utils/AppContext'

const WithCancelButton: React.FC<WithCancelButtonType> = ({ onAdd }) => {
  const { toggleAddView } = useGlobalContext()

  return (
    <View style={styleUtils.buttonContainer}>
      <Button onPress={onAdd} title="Add" />
      <Button title="Cancel" onPress={toggleAddView} />
    </View>
  )
}

export default WithCancelButton

const styles = StyleSheet.create({})
