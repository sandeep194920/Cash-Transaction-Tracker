import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../utils/AppContext'
import EditableViewWrapper from './EditableViewWrapper'
import WithCancelButton from '../Buttons/WithCancelButton'
import { styleUtils } from '../../utils/styles'

const AddCustomer = () => {
  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      <EditableViewWrapper>
        <Text>Customer</Text>
      </EditableViewWrapper>
      <WithCancelButton />
    </SafeAreaView>
  )
}

export default AddCustomer

const styles = StyleSheet.create({})
