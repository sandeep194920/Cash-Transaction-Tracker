import { Pressable, StyleSheet, Text, View } from 'react-native'

import React from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { colors, styleUtils } from '../utils/styles'
import { useQuery, useUser } from "@realm/react";
// import { OrdersType } from "../utils/types";
import { Order } from "../models/OrderSchema";
import { Customer as CustomerSchema } from "../models/CustomerSchema";

interface CustomerTransactionProps {
  transaction: Order;
  customer_id: string;
  customer_name: string;
}

const CustomerTransaction: React.FC<CustomerTransactionProps> = ({
  transaction,
  customer_name,
  customer_id,
}) => {
  const { order_price, order_date, _id: order_id } = transaction;

  // const getLinkedManufacturer = (car: LinkedCar): string => {
  //   const manufacturer = car.linkingObjects<ToManyManufacturer>(
  //     'ToManyManufacturer',
  //     'cars',
  //   )[0];
  //   // Returns 'Nissan', as only one manufacturer is linked
  //   // to this car object.
  //   return manufacturer.name;
  // };

  console.log("The name is", customer_name, "id is", customer_id);

  const getLinkedCustomer = (order: Order) => {
    console.log("The order is", order);
    
    const customers = order.linkingObjects<CustomerSchema>(
      "Customer",
      "orders"
    );
    if (customers.length > 0) return customers[0];
    else return null;
  };

  const result = getLinkedCustomer(transaction);
  console.log("The result is", result);

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/customers/orders/${order_id}`,
          params: { customer_id, customer_name, order_id: order_id.toString() },
        })
      }
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
