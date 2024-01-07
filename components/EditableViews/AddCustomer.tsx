import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../utils/AppContext'
import EditableViewWrapper from './EditableViewWrapper'
import WithCancelButton from '../Buttons/WithCancelButton'
import { colors, styleUtils } from '../../utils/styles'
import {
  MaterialIcons,
  Ionicons,
  Entypo,
  FontAwesome,
} from '@expo/vector-icons'

const AddCustomer = () => {
  const { addNewCustomerHandler, formik } = useGlobalContext()

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
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              value={formik.values.name}
              style={styles.textInput}
              placeholder="Name"
            />
          </View>
          <View>
            {/* Display validation errors if touched */}
            <Text style={styles.error}>
              {formik.touched.name && formik.errors.name}
            </Text>
          </View>
          {/* Phone */}
          <View style={styles.flexItem}>
            <Entypo name="phone" size={24} color={colors.darkGray1} />
            <TextInput
              // onChangeText={(text) => handleCustomerFormInput(text, 'phone')} // if we dont use formik
              onChangeText={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
              value={formik.values.phone}
              style={styles.textInput}
              placeholder="Phone"
            />
          </View>
          {/* Display validation errors if touched */}
          <Text style={styles.error}>
            {formik.touched.phone && formik.errors.phone}
          </Text>
          {/* Email */}
          <View style={styles.flexItem}>
            <MaterialIcons name="email" size={21} color={colors.darkGray1} />
            <TextInput
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
              style={styles.textInput}
              placeholder="Email"
            />
          </View>
          {/* Display validation errors if touched */}
          <Text style={styles.error}>
            {formik.touched.email && formik.errors.email}
          </Text>
          {/* Address */}
          <View style={styles.flexItem}>
            <FontAwesome
              name="address-card"
              size={24}
              color={colors.darkGray1}
            />
            <TextInput
              onChangeText={formik.handleChange('address')}
              onBlur={formik.handleBlur('address')}
              value={formik.values.address}
              style={styles.textInput}
              placeholder="Address"
            />
          </View>
          {/* Display validation errors if touched */}
          <Text style={styles.error}>
            {formik.touched.address && formik.errors.address}
          </Text>
        </View>
        {/* <--- ADD CUSTOMER */}
      </EditableViewWrapper>
      <WithCancelButton onAdd={addNewCustomerHandler} />
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
  error: {
    color: colors.red,
    marginLeft: 45,
  },
})
