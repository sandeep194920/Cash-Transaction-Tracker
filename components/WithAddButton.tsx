import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { styleUtils } from '../utils/styles'
import { AddButton } from '../data'

const WithAddButton = ({ children }: AddButton) => {
  return (
    <View style={styleUtils.addBtnContainer}>
      {children}
      {/* Add the "+" button */}
      <View style={styleUtils.buttonContainer}>
        <TouchableOpacity style={styleUtils.addButton}>
          <Text style={styleUtils.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default WithAddButton

const styles = StyleSheet.create({})
