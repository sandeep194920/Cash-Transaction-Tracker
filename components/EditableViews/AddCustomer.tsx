import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../utils/AppContext'
import EditableViewWrapper from './EditableViewWrapper'

const AddCustomer = () => {
  return (
    <EditableViewWrapper>
      <Text>Customer</Text>
    </EditableViewWrapper>
  )
}

export default AddCustomer

const styles = StyleSheet.create({})
