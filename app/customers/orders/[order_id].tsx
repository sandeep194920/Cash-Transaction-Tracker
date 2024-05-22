import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { colors, dimensions, styleUtils } from "../../../utils/styles";
import Button from "../../../components/Buttons/AddEditButton";
import { useObject, useQuery } from "@realm/react";
import {
  Order as OrderSchema,
  Item as ItemSchema,
} from "../../../models/OrderSchema";

import { Customer as CustomerSchema } from "../../../models/CustomerSchema";

import { BSON } from "realm";

const CustomerOrder = () => {
  const { order_id } = useLocalSearchParams<{ order_id: string }>();
  const [customerDetails, setCustomerDetails] =
    useState<CustomerSchema | null>();

  const order = useObject(OrderSchema, new BSON.ObjectID(order_id));
  // const order = useQuery(Order, (orders) => {
  //   return orders.filtered("_id == $0", order_id.toString());
  // });

  // if (order) {
  //   const result = getLinkedCustomer(order);
  //   console.log("The result in orderpage is", result);
  //   setCustomerDetails(result);
  // }

  useEffect(() => {
    if (!order) return;

    const fetchCustomerDetails = () => {
      try {
        const customer = order.linkingObjects<CustomerSchema>(
          "Customer",
          "orders"
        )[0];
        setCustomerDetails(customer);
      } catch (error) {
        console.error("Failed to fetch customer details:", error);
      }
    };

    fetchCustomerDetails();
  }, [order]);

  const customer = useMemo(() => customerDetails, [customerDetails]);

  const { order_date, order_price, items, paid_by_customer, carry_over } =
    order ?? {
      order_price: 0,
      paid_by_customer: 0,
      carry_over: 0,
    };
  let type = "CarryOver";

  if (order_price - paid_by_customer <= 0) {
    type = "Overpayment";
  }

  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      <View style={styleUtils.flexContainer}>
        {/* Header to show date and price */}
        {/* <Text>HELLO</Text> */}
        <View style={styleUtils.headerTextContainer}>
          <Text style={styleUtils.headerText}>
            {order_date?.toDateString()}
          </Text>
          <Text style={styleUtils.smallText}>(Monday)</Text>
        </View>
        {/* Items */}
        <View style={styles.itemsContainer}>
          <FlatList
            data={items}
            renderItem={({ item }) => <ItemDetails item={item} />}
          />
        </View>

        {/* Customer Price Details */}

        {/* total */}
        <View style={styles.priceContainer}>
          <Text style={styleUtils.mediumText}>Total </Text>
          <View style={styleUtils.flexRow}>
            <View
              style={{
                ...styleUtils.tag,
                backgroundColor: colors.lightBlue1,
              }}
            >
              <Text
                style={{
                  ...styleUtils.tagText,
                  fontSize: dimensions.mediumFont,
                }}
              >{` $ ${order_price} `}</Text>
            </View>
          </View>
        </View>
        {/* paid by customer */}
        <View style={styles.priceContainer}>
          <Text style={styleUtils.mediumText}>{customer?.name} paid</Text>
          <View style={styleUtils.flexRow}>
            <View
              style={{
                ...styleUtils.tag,
                backgroundColor: colors.lightGreen1,
              }}
            >
              <Text
                style={{
                  ...styleUtils.tagText,
                  fontSize: dimensions.mediumFont,
                }}
              >{` $ ${paid_by_customer} `}</Text>
            </View>
          </View>
        </View>
        {/* carryover */}
        <View style={styles.priceContainer}>
          <Text style={styleUtils.mediumText}>{type}</Text>
          <View style={styleUtils.flexRow}>
            <View
              style={{
                ...styleUtils.tag,
                backgroundColor:
                  type === "Overpayment" ? colors.lightGreen2 : colors.red,
              }}
            >
              <Text
                style={{
                  ...styleUtils.tagText,
                  fontSize: dimensions.mediumFont,
                }}
              >{` $ ${carry_over} `}</Text>
            </View>
          </View>
        </View>
      </View>
      <Button type="EDIT" />
    </SafeAreaView>
  );
};

export default CustomerOrder;

type ItemProps = {
  // name: string
  // pricePerItem: number
  // quantity: number
  item: ItemSchema;
};

const ItemDetails: React.FC<ItemProps> = ({ item }) => {
  const { name, price_per_item, quantity } = item;
  return (
    <View style={styles.itemContainerExtended}>
      <Text style={styleUtils.largeText}>
        {name[0].toUpperCase()}
        {name.slice(1)}
        <Text style={styleUtils.subText}> (× {quantity})</Text>
      </Text>
      <View style={styleUtils.flexRow}>
        <View
          style={{
            ...styleUtils.tag,
          }}
        >
          <Text style={{ ...styleUtils.tagText, color: colors.black }}>{` $ ${
            price_per_item * quantity
          } `}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    backgroundColor: colors.lightGray1,
    marginBottom: dimensions.marginLarge1,
  },
  itemContainerExtended: {
    ...styleUtils.itemContainer,
    marginBottom: dimensions.noMargin,
  },
  priceContainer: {
    ...styleUtils.itemContainer,
    backgroundColor: 'transparent',
    marginBottom: dimensions.noMargin,
  },
})
