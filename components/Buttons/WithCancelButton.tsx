import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Button,
  SafeAreaView,
} from 'react-native'
import React from 'react'
import { colors, styleUtils } from '../../utils/styles'
import { ButtonType, WithCancelButtonType } from '../../utils/types'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useGlobalContext } from '../../utils/AppContext'

const WithCancelButton: React.FC<WithCancelButtonType> = ({ addFn }) => {
  const { toggleAddView } = useGlobalContext()

  return (
    <View style={styleUtils.buttonContainer}>
      <Button onPress={addFn} title="Add" />
      <Button title="Cancel" onPress={toggleAddView} />
    </View>
  )
}

export default WithCancelButton

const styles = StyleSheet.create({})
