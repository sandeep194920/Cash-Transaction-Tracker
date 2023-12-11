import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { orders } from '../../../data'

const CustomerOrder = () => {
  const { customer_id, order_id } = useLocalSearchParams()
  const order_id_string = order_id as string
  const order = orders[customer_id as string].find(
    (order) => order.order_id === order_id
  )
  console.log(order)
  return (
    <View>
      <Text>Customer Order</Text>
    </View>
  )
}

export default CustomerOrder

const styles = StyleSheet.create({})
