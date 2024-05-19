import { Pressable, StyleSheet, Text, View } from 'react-native'

import React from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { colors, styleUtils } from '../utils/styles'
import { useQuery, useUser } from "@realm/react";
// import { OrdersType } from "../utils/types";
import { OrderType } from "../models/OrderSchema";

const CustomerTransaction: React.FC<OrderType> = (props) => {
  const { order_price, order_date, _id: order_id } = props;
  return (
    <Pressable
    // onPress={() =>
    //   router.push({
    //     pathname: `/customers/orders/${order_id}`,
    //     params: { customer_id, customer_name },
    //   })
    // }
    >
      <View style={styleUtils.itemContainer}>
        <View style={styleUtils.columnContainer}>
          <View>
            <Text style={styleUtils.smallText}>
              {order_date.toDateString()}
            </Text>
          </View>
          <View style={{ ...styleUtils.flexRow, justifyContent: "center" }}>
            <Ionicons name="pricetag" size={20} color={colors.lightGreen1} />
            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>$10</Text>
          </View>
        </View>
        <View style={styleUtils.columnContainer}>
          <View style={styleUtils.flexRow}>
            <View
              style={{ ...styleUtils.tag, backgroundColor: colors.lightGreen1 }}
            >
              <Text style={styleUtils.tagText}>Paid</Text>
            </View>
            <Text style={styleUtils.mediumText}>${order_price}</Text>
          </View>
          <View style={styleUtils.flexRow}>
            <View
              style={{
                ...styleUtils.tag,
                backgroundColor: 10 >= 0 ? colors.lightBlue1 : colors.red,
              }}
            >
              <Text style={styleUtils.tagText}>{`${
                10 >= 0 ? "Overpayment" : "Outstanding"
              }`}</Text>
            </View>
            <Text style={styleUtils.mediumText}>${10}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CustomerTransaction

const styles = StyleSheet.create({})
