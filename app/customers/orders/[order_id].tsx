import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
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
import TextHighlight from "../../../components/TextHighlight";
import AddOrEditTransaction from "../../../screens/modalScreens/Transaction/AddOrEditTransaction";
import { useGlobalContext } from "../../../utils/AppContext";
import { formatDate } from "../../../utils/formatDate";

const CustomerOrder = () => {
  const { order_id } = useLocalSearchParams<{ order_id: string }>();
  const [customerDetails, setCustomerDetails] =
    useState<CustomerSchema | null>();
  const { showTransactionModal } = useGlobalContext();

  const order = useObject(OrderSchema, new BSON.ObjectID(order_id));

  const [isEditMode, setIsEditMode] = useState(false);

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
  console.log("THE CUSTOMER IS", customer);

  const { order_date, order_price, items, paid_by_customer, carry_over } =
    order ?? {
      order_price: 0,
      paid_by_customer: 0,
      carry_over: 0,
    };
  let type = "Carryover till date";

  if (order_price - paid_by_customer <= 0) {
    type = "Overpayment till date";
  }

  const totalAmount = useMemo(() => {
    return items?.reduce((acc, current) => {
      return (
        acc + parseFloat(current.price_per_item.toFixed(2)) * current.quantity
      );
    }, 0);
  }, [items]);

  // * EDIT TRANSACTION
  const editTransactionHandler = () => {
    console.log("The edit button is clicked");

    setIsEditMode((prev) => !prev);
    showTransactionModal(true);
  };

  const handleCloseEditMode = () => {
    setIsEditMode(false);
  };

  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      {order_date && (
        <>
          <View style={styleUtils.flexContainer}>
            {/* Header to show date and price */}
            <View style={styleUtils.headerTextContainer}>
              <View style={styleUtils.itemRowContainer}>
                <Text style={styleUtils.headerText}>
                  {formatDate(order_date).date}
                </Text>
                <Text style={styleUtils.smallText}>
                  ({formatDate(order_date).day})
                </Text>
              </View>
              {/* TODO: Make the date in Jun 30, 2024 (Sunday) format */}
              {/* <Text style={styleUtils.smallText}>(Monday)</Text> */}
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
            <View style={styles.itemRowContainer}>
              <Text style={styleUtils.mediumText}>Total</Text>
              <TextHighlight
                innerText={`$ ${totalAmount}`}
                type="info"
                size="medium"
              />
            </View>
            {/* paid by customer */}
            <View style={styles.itemRowContainer}>
              <Text style={styles.textStyle}>
                John Paid{" "}
                <Text style={styleUtils.subText}>
                  (on {order_date?.toDateString()})
                </Text>
              </Text>
              <TextHighlight
                innerText={`$ ${paid_by_customer}`}
                type="success"
                size="medium"
              />
            </View>
            {/* carryover */}
            <View style={styles.itemRowContainer}>
              <Text style={styleUtils.mediumText}>Carryover so far</Text>
              <TextHighlight
                type="warning"
                innerText={`$ ${paid_by_customer}`}
                size="medium"
              />
            </View>
          </View>
          <Button type="EDIT" onPress={editTransactionHandler} />
          {isEditMode && (
            <AddOrEditTransaction
              type="EDIT"
              order={order}
              handleCloseEditMode={handleCloseEditMode}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default CustomerOrder;

type ItemProps = {
  item: ItemSchema;
};

const ItemDetails: React.FC<ItemProps> = ({ item }) => {
  const { name, price_per_item, quantity } = item;
  return (
    <View style={styles.itemRowContainer}>
      <View
        style={{
          ...styleUtils.itemRowContainer,
          gap: 10,
        }}
      >
        <Text style={{ ...styles.textStyle, ...styleUtils.largeText }}>
          {name[0].toUpperCase()}
          {name.slice(1)}
        </Text>
        <Text style={{ ...styleUtils.subText, marginTop: 0 }}>
          (× {quantity})
        </Text>
      </View>
      <View style={styleUtils.flexRow}>
        <View
          style={{
            ...styleUtils.tag,
          }}
        >
          <Text
            style={{ ...styleUtils.mediumText, color: colors.black }}
          >{` $ ${price_per_item * quantity} `}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    ...styleUtils.itemRowContainer,
    backgroundColor: colors.lightGray1,
    marginBottom: dimensions.marginMedium,
  },
  itemRowContainer: {
    ...styleUtils.itemRowContainer,
    padding: dimensions.paddingSmall3,
  },
  textStyle: {
    ...styleUtils.mediumText,
    maxWidth: "70%",
  },
});
