import { View, Text, Pressable, FlatList } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import data, { CustomerType } from '../data'
import Customer from '../components/Customer'

const Users = () => {
  const { customers } = data

  return (
    <View>
      <FlatList
        data={customers}
        renderItem={({ item }) => (
          <Customer
            name={item.name}
            balance={item.balance}
            customer_id={item.customer_id}
          />
        )}
      />
    </View>
  )
}

export default Users
