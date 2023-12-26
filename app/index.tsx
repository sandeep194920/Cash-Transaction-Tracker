import { FlatList, SafeAreaView, View } from 'react-native'
import React from 'react'
import data from '../data'
import Customer from '../components/Customer'
import AddEditButton from '../components/Buttons/AddEditButton'
import AddCustomer from '../components/EditableViews/AddCustomer'
import { useGlobalContext } from '../utils/AppContext'
import { styleUtils } from '../utils/styles'

const Customers = () => {
  const { customers } = data
  const { inputView } = useGlobalContext()

  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      {!inputView.isInput && (
        <>
          <FlatList
            data={customers}
            renderItem={({ item }) => <Customer {...item} />}
          />
          <AddEditButton type="ADD" />
        </>
      )}
      {inputView.isInput && inputView.inputType === 'ADD' && <AddCustomer />}
    </SafeAreaView>
  )
}

export default Customers
