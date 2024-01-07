import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
  const { addNewCustomer } = useGlobalContext()
  const [newCustomer, setNewCustomer] = useState({})

  useEffect(() => {
    console.log('The new customer is ', newCustomer)
  }, [newCustomer])

  // const handleChange = (e: any, inputType: string) => {
  //   console.log('The name is ', inputType)
  // }

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
            <TextInput
              // onChange={(e) => handleChange(e, 'name')}
              style={styles.textInput}
              placeholder="Name"
            />
          </View>
          {/* Phone */}
          <View style={styles.flexItem}>
            <Entypo name="phone" size={24} color={colors.darkGray1} />
            <TextInput
              // onChange={(e) => handleChange(e, 'phone')}
              style={styles.textInput}
              placeholder="Phone"
            />
          </View>
          {/* Email */}
          <View style={styles.flexItem}>
            <MaterialIcons name="email" size={21} color={colors.darkGray1} />
            <TextInput
              style={styles.textInput}
              // onChange={(e) => handleChange(e, 'email')}
              placeholder="Email"
            />
          </View>
          {/* Address */}
          <View style={styles.flexItem}>
            <FontAwesome
              name="address-card"
              size={24}
              color={colors.darkGray1}
            />
            <TextInput
              style={styles.textInput}
              // onChange={(e) => handleChange(e, 'address')}
              placeholder="Address"
            />
          </View>
        </View>
        {/* <--- ADD CUSTOMER */}
      </EditableViewWrapper>
      <WithCancelButton addFn={addNewCustomer} />
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
