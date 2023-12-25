import { FlatList } from 'react-native'
import React from 'react'
import data from '../data'
import Customer from '../components/Customer'
import WithAddButton from '../components/WithAddButton'

const Customers = () => {
  const { customers } = data

  return (
    <WithAddButton>
      <FlatList
        data={customers}
        renderItem={({ item }) => <Customer {...item} />}
      />
    </WithAddButton>
  )
}

export default Customers
