import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

type Customer = {
  name: string
  customer_id: string
  balance: number
}
const order_price = 10
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

        <View style={styles.rightContainer}>
          <View style={styles.textContainer}>
            <View
              style={{
                ...styles.tag,
                backgroundColor: balance >= 0 ? '#8aaf05' : '#bc412b',
              }}
            >
              <Text style={styles.tagText}>
                {balance >= 0 ? 'Overpayment ' : 'Outstanding'}
              </Text>
            </View>
            <Text style={{ fontWeight: '500' }}>${balance}</Text>
          </View>
        </View>
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
    fontWeight: '500',
  },
  smallText: {
    color: '#777474',
    fontSize: 13,
    marginTop: 10,
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 16,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagText: {
    color: 'white',
    fontSize: 11,
  },
  tag: {
    borderRadius: 30,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 15,
  },
})
