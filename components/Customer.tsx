import { Pressable, StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { colors, styleUtils } from '../utils/styles'
import { useGlobalContext } from '../utils/AppContext'
import { useQuery, useUser } from '@realm/react'
import { Customer as CustomerSchema } from '../models/CustomerSchema'

type Customer = {
  name: string
  customer_id: string
  balance: number
}
const Customer = ({ name, balance, customer_id }: Customer) => {
  const user = useUser()
  console.log('The user data is', user.id)
  const query = useQuery(CustomerSchema, (customers) => {
    return customers.filtered('user_id = $0', user.id)
  })

  return (
    <View>
      <Pressable
        onPress={() =>
          router.push({
            pathname: `/customers/${customer_id}`,
            params: { customer_name: name },
          })
        }
      >
        <View style={styleUtils.itemContainer}>
          <View>
            <Text style={styleUtils.largeText}>{name}</Text>
            <Text style={styleUtils.subText}>({customer_id})</Text>
          </View>

          <View style={styleUtils.columnContainer}>
            <View style={styleUtils.flexRow}>
              <View
                style={{
                  ...styleUtils.tag,
                  backgroundColor:
                    balance >= 0 ? colors.lightGreen1 : colors.red,
                }}
              >
                <Text style={styleUtils.tagText}>
                  {balance >= 0 ? 'Overpayment ' : 'Outstanding'}
                </Text>
              </View>
              <Text style={{ fontWeight: '500' }}>${balance}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export default Customer

const styles = StyleSheet.create({})
