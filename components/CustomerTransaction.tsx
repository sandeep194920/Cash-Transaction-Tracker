import { Pressable, StyleSheet, Text, View } from "react-native";

import React from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, dimensions, styleUtils } from "../utils/styles";
import { Order } from "../models/OrderSchema";
import { Customer as CustomerSchema } from "../models/CustomerSchema";
import TextHighlight from "./TextHighlight";

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
  const {
    order_price,
    order_date,
    _id: order_id,
    paid_by_customer,
  } = transaction;

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
  console.log("The order id type is", typeof order_id);

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/customers/orders/[order_id]`,
          params: { order_id: order_id.toString() },
        })
      }
    >
      <View style={styles.itemColumnContainer}>
        <View style={styles.itemRowContainer}>
          <View>
            <Text style={styleUtils.smallText}>
              {order_date.toDateString()}
            </Text>
          </View>
          <TextHighlight
            type="success"
            size="small"
            innerText="Paid"
            outerText={`$${paid_by_customer}`}
          />
        </View>

        <View style={styles.itemRowContainer}>
          <View style={{ ...styleUtils.flexRow, justifyContent: "center" }}>
            <Ionicons name="pricetag" size={20} color={colors.lightGreen1} />
            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
              ${order_price}
            </Text>
          </View>
          <TextHighlight
            type="info"
            size="small"
            innerText="Overpayment"
            outerText={`$${order_price}`}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default CustomerTransaction;

const styles = StyleSheet.create({
  itemRowContainer: {
    ...styleUtils.itemRowContainer,
    marginVertical: 8,
  },
  itemColumnContainer: {
    justifyContent: "space-between",
    paddingVertical: dimensions.paddingSmall3,
    paddingHorizontal: dimensions.paddingMedium,
    backgroundColor: colors.lightGray1,
    marginBottom: dimensions.marginMedium,
  },
});
