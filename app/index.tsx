import { FlatList, Pressable, SafeAreaView, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import data from '../data'
import Customer from '../components/Customer'
import { Customer as CustomerSchema } from '../models/CustomerSchema'
import AddEditButton from '../components/Buttons/AddEditButton'
import AddCustomer from '../components/EditableViews/AddCustomer'
import { useGlobalContext } from '../utils/AppContext'
import { colors, dimensions, styleUtils } from '../utils/styles'
import { StyleSheet } from 'react-native'
import { useAuth, useQuery, useUser } from '@realm/react'
// import { CustomerType } from '../utils/types'
import { BSON } from 'realm'

interface CustomerType {
  _id: BSON.ObjectID
  name: string
  address: string
  signed_up_on: Date
  balance: number
  user_id: string
}

const Customers = () => {
  // const { customers } = data
  const { inputView } = useGlobalContext()
  const { logOut } = useAuth()
  const customersData = useQuery(CustomerSchema)
  const [customers, setCustomers] = useState<CustomerType[]>([])

  console.log('the db customers are', customersData)

  useEffect(() => {
    // setCustomers(customersData)
    if (customersData) {
      // Extract array of CustomerType objects from customersData
      const extractedCustomers: CustomerType[] = customersData.map(
        (customer) => ({
          _id: customer._id,
          name: customer.name,
          address: customer.address,
          signed_up_on: customer.signed_up_on,
          balance: customer.balance,
          user_id: customer.user_id,
        })
      )

      // Update the customers state with extracted customers
      setCustomers(extractedCustomers)
    }
  }, [customersData])

  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => logOut()}>
          <Text style={styles.buttonText}>Sign out</Text>
        </Pressable>
      </View>
      {!inputView.isInput && (
        <>
          <FlatList
            data={customers}
            renderItem={({ item }) => (
              <Customer customer_id={item._id.toString()} {...item} />
            )}
          />

          <AddEditButton type="ADD" />
        </>
      )}
      {inputView.isInput && inputView.inputType === 'ADD' && <AddCustomer />}
    </SafeAreaView>
  )
}

export default Customers

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
  },
  buttonText: {
    color: colors.white,
    backgroundColor: colors.red,
    padding: dimensions.paddingSmall2,
    paddingHorizontal: dimensions.paddingSmall3,
    borderRadius: dimensions.borderRadius,
  },
})
