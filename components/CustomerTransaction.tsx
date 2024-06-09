import { Pressable, StyleSheet, Text, View } from "react-native";

import React from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, styleUtils } from "../utils/styles";
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
  console.log("The order id type is", typeof order_id);

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/customers/orders/[order_id]`,
          params: { order_id: order_id.toString() },
          // params: { customer_id, customer_name },
        })
      }
    >
      <View style={styleUtils.itemColumnContainer}>
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
            outerText={`$${order_price}`}
          />
        </View>

        <View style={styles.itemRowContainer}>
          <View style={{ ...styleUtils.flexRow, justifyContent: "center" }}>
            <Ionicons name="pricetag" size={20} color={colors.lightGreen1} />
            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>$10</Text>
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
  itemContainer: {
    paddingHorizontal: "5%",
    paddingVertical: 5,
    backgroundColor: colors.lightGray1,
  },
  itemRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});
