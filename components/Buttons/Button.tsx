import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, styleUtils } from '../../utils/styles'
import { ButtonType } from '../../utils/types'
import { Entypo, Ionicons } from '@expo/vector-icons'

const Button = ({ children, type }: ButtonType) => {
  return (
    <View style={styleUtils.addBtnContainer}>
      {children}
      <View style={styleUtils.buttonContainer}>
        {type === 'ADD' ? (
          <TouchableOpacity style={{ ...styleUtils.button }}>
            {/* <Text style={styleUtils.buttonText}>+</Text> */}
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ ...styleUtils.button, backgroundColor: colors.lightBlue1 }}
          >
            <Entypo name="edit" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({})
