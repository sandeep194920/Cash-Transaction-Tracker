import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import React from 'react'
import { colors, styleUtils } from '../../utils/styles'
import { ButtonType } from '../../utils/types'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useGlobalContext } from '../../utils/AppContext'

const Button = ({ children, type }: ButtonType) => {
  const { toggleAddView } = useGlobalContext()
  const buttonTypes = {
    ADD: (
      <Pressable style={{ ...styleUtils.button }} onPress={toggleAddView}>
        <Ionicons name="add" size={24} color="white" />
      </Pressable>
    ),
    EDIT: (
      <Pressable
        style={{ ...styleUtils.button, backgroundColor: colors.lightBlue1 }}
      >
        <Entypo name="edit" size={24} color="white" />
      </Pressable>
    ),
  }
  console.log('The type is', type)
  return (
    <View style={styleUtils.addBtnContainer}>
      {children}
      <View style={styleUtils.buttonContainer}>
        {type === 'ADD' ? (
          <Pressable style={{ ...styleUtils.button }} onPress={toggleAddView}>
            <Ionicons name="add" size={24} color="white" />
          </Pressable>
        ) : (
          <Pressable
            style={{ ...styleUtils.button, backgroundColor: colors.lightBlue1 }}
          >
            <Entypo name="edit" size={24} color="white" />
          </Pressable>
        )}
      </View>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({})
