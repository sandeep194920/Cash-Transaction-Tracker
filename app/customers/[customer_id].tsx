import { View, FlatList, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router/src/hooks'
import data from '../../data'
import CustomerTransaction from '../../components/CustomerTransaction'
import { styleUtils } from '../../utils/styles'
import WithAddButton from '../../components/Buttons/AddEditButton'
import Button from '../../components/Buttons/AddEditButton'
import AddCustomer from '../../components/EditableViews/AddCustomer'
import { useQuery, useRealm } from '@realm/react'

const Customer = () => {
  const realm = useQuery('Profile')

  console.log('The log is', realm)

  const { customer_id, customer_name } = useLocalSearchParams()
  const customerIdString = customer_id as string // Type assertion. This is required for useLocalSearchParams
  const customerName = customer_name as string
  const { orders } = data
  const customerOrders = orders[customerIdString] || []
  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      <View style={styleUtils.headerTextContainer}>
        <Text style={styleUtils.headerText}>{customer_name}</Text>
        <Text style={styleUtils.smallText}>({customer_id})</Text>
      </View>
      <FlatList
        data={customerOrders}
        renderItem={({ item }) => (
          <CustomerTransaction
            {...item}
            customer_id={customerIdString}
            customer_name={customerName}
          />
        )}
      />
      <Button type="ADD" />
    </SafeAreaView>
  )
}

export default Customer

const styles = StyleSheet.create({})
