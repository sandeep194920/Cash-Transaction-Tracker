import { FlatList, View, Text } from 'react-native'
import React from 'react'
import data from '../data'
import Customer from '../components/Customer'
import Button from '../components/Buttons/Button'
import AddCustomer from '../components/EditableViews/AddCustomer'
import { useGlobalContext } from '../utils/AppContext'

const Customers = () => {
  const { customers } = data
  const { inputView } = useGlobalContext()

  return (
    <>
      <Button type="ADD">
        <FlatList
          data={customers}
          renderItem={({ item }) => <Customer {...item} />}
        />
      </Button>
      {inputView.isInput && inputView.inputType === 'ADD' && <AddCustomer />}
    </>
  )
}

export default Customers
