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
import { ButtonType } from '../../utils/types'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useGlobalContext } from '../../utils/AppContext'

const WithCancelButton = () => {
  const {} = useGlobalContext()

  return (
    <View style={styleUtils.buttonContainer}>
      <Button title="Hello" />
      <Button title="Hello" />
    </View>
  )
}

export default WithCancelButton

const styles = StyleSheet.create({})
