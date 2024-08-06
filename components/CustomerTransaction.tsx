import { Pressable, StyleSheet, Text, View } from "react-native";

import React, { Dispatch } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, dimensions, styleUtils } from "../utils/styles";
import { Order } from "../models/OrderSchema";
import { Customer as CustomerSchema } from "../models/CustomerSchema";
import TextHighlight from "./TextHighlight";
import { formatDate } from "../utils/formatDate";
import { useObject } from "@realm/react";
import { BSON } from "realm";

interface CustomerTransactionProps {
  transaction: Order;
  customer_id: string;
  customer_name: string;
  // setRecentlyModifiedOrder: Dispatch<React.SetStateAction<null | string>>;
}

const CustomerTransaction: React.FC<CustomerTransactionProps> = ({
  transaction,
  customer_name,
  customer_id,
}) => {
  const {
    order_price,
    order_date,
    carry_over,
    _id: order_id,
    paid_by_customer,
  } = transaction;

  // const getLinkedCustomer = (order: Order) => {
  //   const customers = order.linkingObjects<CustomerSchema>(
  //     "Customer",
  //     "orders"
  //   );
  //   if (customers.length > 0) return customers[0];
  //   else return null;
  // };

  // const result = getLinkedCustomer(transaction);
  // console.log("The result is", result);
  // console.log("The order id type is", typeof order_id);

  const customer = useObject(CustomerSchema, new BSON.ObjectID(customer_id));

  console.log("The customer here is", customer);

  const onPressHandler = () => {
    router.push({
      pathname: `/customers/orders/[order_id]`,
      params: { order_id: order_id.toString(), customer_id },
    });
  };

  return (
    <Pressable onPress={onPressHandler}>
      <View style={styles.itemColumnContainer}>
        <View style={styles.itemRowContainer}>
          <View style={styleUtils.itemRowContainer}>
            <Text style={styleUtils.smallText}>
              {formatDate(order_date, "short").day}
              {", "}
            </Text>
            <Text style={styleUtils.smallText}>
              {formatDate(order_date).date}
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
            type={carry_over > 0 ? `warning` : `info`}
            size="small"
            innerText={carry_over > 0 ? `Balance` : `Overpayment`}
            outerText={`$${carry_over}`}
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
