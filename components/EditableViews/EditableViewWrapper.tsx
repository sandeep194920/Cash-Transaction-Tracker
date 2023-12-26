import {
  Animated,
  Dimensions,
  SafeAreaView,
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
        flex: 1,
        opacity: fadeAnim,
        paddingTop: 0, // Adjust as needed to avoid overlap with the status bar
        paddingBottom: 0, // Adjust as needed to avoid overlap with the status bar
      }}
    >
      {children}
    </Animated.View>
  )
}

export default EditableViewWrapper

const styles = StyleSheet.create({})
