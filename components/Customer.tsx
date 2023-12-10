import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

type Customer = {
  name: string
  customer_id: string
  balance: number
}

const Customer = ({ name, balance, customer_id }: Customer) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: `/customers/${customer_id}`,
          params: { customer_name: name },
        })
      }
    >
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.smallText}>({customer_id})</Text>
        </View>
        <Text style={{ ...styles.text, color: balance > 0 ? 'green' : 'red' }}>
          {balance > 0 ? 'Owes you    ' : 'You owe    '}
          {balance}
        </Text>
      </View>
    </Pressable>
  )
}

export default Customer

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#dddddd',
    marginBottom: 10,
    padding: 18,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#121111',
    fontSize: 17.2,
  },
  smallText: {
    color: '#777474',
    fontSize: 13,
  },
})
