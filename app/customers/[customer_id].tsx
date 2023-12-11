import { View, FlatList, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router/src/hooks'
import data from '../../data'
import CustomerTransaction from '../../components/CustomerTransaction'

const Customer = () => {
  const { customer_id, customer_name } = useLocalSearchParams()
  const customerIdString = customer_id as string // Type assertion
  const { orders } = data
  const customerOrders = orders[customerIdString] || []
  return (
    <View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{customer_name}</Text>
        <Text style={styles.smallText}>({customer_id})</Text>
      </View>
      <FlatList
        data={customerOrders}
        renderItem={({ item }) => (
          <CustomerTransaction {...item} customer_id={customerIdString} />
        )}
      />
    </View>
  )
}

export default Customer

const styles = StyleSheet.create({
  headerTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    marginVertical: 14,
  },
  headerText: {
    color: '#171414',
    fontSize: 20,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 13,
  },
})
