import { Pressable, StyleSheet, Text, View } from 'react-native'

import React from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { colors, styleUtils } from '../utils/styles'

type CustomerTransaction = {
  order_id: string
  customer_id: string
  order_price: number
  order_date: string
  items: {}
}

const CustomerTransaction = ({
  order_id,
  order_price,
  order_date,
  customer_id,
}: CustomerTransaction) => {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/customers/orders/${order_id}`,
          params: { customer_id },
        })
      }
    >
      <View style={styleUtils.itemContainer}>
        <View style={styleUtils.columnContainer}>
          <View>
            <Text style={styleUtils.smallText}>{order_date}</Text>
          </View>
          <View style={{ ...styleUtils.flexRow, justifyContent: 'center' }}>
            <Ionicons name="pricetag" size={20} color={colors.lightGreen1} />
            <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>$10</Text>
          </View>
        </View>
        <View style={styleUtils.columnContainer}>
          <View style={styleUtils.flexRow}>
            <View
              style={{ ...styleUtils.tag, backgroundColor: colors.lightGreen1 }}
            >
              <Text style={styleUtils.tagText}>Given</Text>
            </View>
            <Text style={styleUtils.mediumText}>${order_price}</Text>
          </View>
          <View style={styleUtils.flexRow}>
            <View
              style={{
                ...styleUtils.tag,
                backgroundColor:
                  order_price >= 0 ? colors.lightBlue1 : colors.red,
              }}
            >
              <Text style={styleUtils.tagText}>{`${
                order_price >= 0 ? 'Overpayment' : 'Outstanding'
              }`}</Text>
            </View>
            <Text style={styleUtils.mediumText}>${order_price}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default CustomerTransaction

const styles = StyleSheet.create({})
