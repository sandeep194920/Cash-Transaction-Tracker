import { View, FlatList } from 'react-native'
import React from 'react'
import data from '../data'
import Customer from '../components/Customer'

const Customers = () => {
  const { customers } = data

  return (
    <View>
      <FlatList
        data={customers}
        renderItem={({ item }) => <Customer {...item} />}
      />
    </View>
  )
}

export default Customers
