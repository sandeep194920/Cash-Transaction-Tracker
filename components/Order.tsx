import { Pressable, StyleSheet, Text, View } from 'react-native'

import React from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

type Order = {
  order_id: string
  order_price: number
  order_date: string
  items: {}
}

const Order = ({ order_id, order_price, order_date, items }: Order) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push(`/customers/${order_id}`)}
    >
      <View style={styles.itemContainer}>
        <View style={styles.leftContainer}>
          <View>
            <Text style={styles.dateText}>{order_date}</Text>
          </View>
          <View style={{ ...styles.textContainer, justifyContent: 'center' }}>
            <Ionicons name="pricetag" size={20} color="#8aaf05" />
            <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>$10</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.textContainer}>
            <View style={{ ...styles.tag, backgroundColor: '#1caa5c' }}>
              <Text style={styles.tagText}>Given</Text>
            </View>
            <Text style={{ fontWeight: '500' }}>${order_price}</Text>
          </View>
          <View style={styles.textContainer}>
            <View
              style={{
                ...styles.tag,
                backgroundColor: order_price >= 0 ? '#1caaaa' : '#bc412b',
              }}
            >
              <Text style={styles.tagText}>{`${
                order_price >= 0 ? 'Overpayment' : 'Outstanding'
              }`}</Text>
            </View>
            <Text style={{ fontWeight: '500' }}>${order_price}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default Order

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#dddddd',
    marginBottom: 10,
    padding: 18,
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 16,
  },

  leftContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 16,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dateText: {
    fontSize: 11.2,
  },
  text: {
    color: '#121111',
    fontSize: 17.2,
  },
  smallText: {
    color: '#777474',
    fontSize: 13,
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

  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'lightblue',
    // gap: 14,
    // marginVertical: 8,
    // backgroundColor: 'green',
  },
})
