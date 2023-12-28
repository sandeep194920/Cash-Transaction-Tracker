import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../utils/AppContext'
import EditableViewWrapper from './EditableViewWrapper'
import WithCancelButton from '../Buttons/WithCancelButton'
import { colors, styleUtils } from '../../utils/styles'
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  Entypo,
  FontAwesome,
} from '@expo/vector-icons'

const AddCustomer = () => {
  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      <EditableViewWrapper>
        {/* ADD CUSTOMER ---> */}
        <View style={styleUtils.headerTextContainer}>
          <Text style={styleUtils.headerText}>Add New Customer</Text>
        </View>
        <View style={styles.flexContainer}>
          {/* Name */}
          <View style={styles.flexItem}>
            <Ionicons name="person" size={24} color={colors.darkGray1} />
            <TextInput style={styles.textInput} placeholder="Name" />
          </View>
          {/* Phone */}
          <View style={styles.flexItem}>
            <Entypo name="phone" size={24} color={colors.darkGray1} />
            <TextInput style={styles.textInput} placeholder="Phone" />
          </View>
          {/* Email */}
          <View style={styles.flexItem}>
            <MaterialIcons name="email" size={21} color={colors.darkGray1} />
            <TextInput style={styles.textInput} placeholder="Email" />
          </View>
          {/* Address */}
          <View style={styles.flexItem}>
            <FontAwesome
              name="address-card"
              size={24}
              color={colors.darkGray1}
            />
            <TextInput style={styles.textInput} placeholder="Address" />
          </View>
        </View>
        {/* <--- ADD CUSTOMER */}
      </EditableViewWrapper>
      <WithCancelButton />
    </SafeAreaView>
  )
}

export default AddCustomer

const styles = StyleSheet.create({
  flexContainer: {
    padding: 50,
  },
  flexItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginVertical: 20,
  },
  textInput: {
    paddingBottom: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: colors.darkGray1,
    minWidth: 200,
  },
})
