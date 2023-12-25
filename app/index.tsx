import { FlatList } from 'react-native'
import React from 'react'
import data from '../data'
import Customer from '../components/Customer'
import Button from '../components/Buttons/Button'

const Customers = () => {
  const { customers } = data

  return (
    <Button type="ADD">
      <FlatList
        data={customers}
        renderItem={({ item }) => <Customer {...item} />}
      />
    </Button>
  )
}

export default Customers
