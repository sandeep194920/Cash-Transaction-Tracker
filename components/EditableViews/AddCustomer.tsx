import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../utils/AppContext'
import EditableViewWrapper from './EditableViewWrapper'
import WithCancelButton from '../Buttons/WithCancelButton'

const AddCustomer = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <EditableViewWrapper>
        <Text>Customer</Text>
      </EditableViewWrapper>
      <WithCancelButton />
    </SafeAreaView>
  )
}

export default AddCustomer

const styles = StyleSheet.create({})
