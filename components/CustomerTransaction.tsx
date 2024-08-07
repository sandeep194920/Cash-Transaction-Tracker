import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, dimensions, styleUtils } from "../utils/styles";
import { Order } from "../models/OrderSchema";
import TextHighlight from "./TextHighlight";
import { formatDate } from "../utils/formatDate";
import CardOptions from "./CardOptions";
import { useRealm } from "@realm/react";

interface CustomerTransactionProps {
  transaction: Order;
  customer_id: string;
  customer_name: string;
}

const CustomerTransaction: React.FC<CustomerTransactionProps> = ({
  transaction,
  customer_id,
}) => {
  const {
    order_price,
    order_date,
    carry_over,
    _id: order_id,
    paid_by_customer,
  } = transaction;

  const [optionsShown, setOptionsShown] = useState(false);
  const realm = useRealm();

  const onPressHandler = () => {
    router.push({
      pathname: `/customers/orders/[order_id]`,
      params: { order_id: order_id.toString(), customer_id },
    });
  };

  const onLongPressHandler = () => {
    setOptionsShown(true);
  };

  const onHideOption = () => {
    setOptionsShown(false);
  };

  const onDeleteOption = () => {
    realm.write(() => {
      realm.delete(transaction);
    });
  };

  const optionsView = () => {
    if (!optionsShown) return;
    return (
      <CardOptions hideOption={onHideOption} deleteOption={onDeleteOption} />
    );
  };

  return (
    <Pressable onPress={onPressHandler} onLongPress={onLongPressHandler}>
      <View style={styles.rowContainer}>
        <View style={[styles.itemColumnContainer, { flex: 1 }]}>
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
        {optionsView()}
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
  rowContainer: {
    flexDirection: "row",
    gap: 2,
  },
});
