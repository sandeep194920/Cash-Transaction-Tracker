import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../utils/AppContext'

const EditableViewWrapper = ({ children }: { children: React.ReactNode }) => {
  const { fadeAnim } = useGlobalContext()
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        opacity: fadeAnim,
        backgroundColor: 'white', // Customize the background color as needed
        paddingTop: 50, // Adjust as needed to avoid overlap with the status bar
      }}
    >
      {children}
    </Animated.View>
  )
}

export default EditableViewWrapper

const styles = StyleSheet.create({})
