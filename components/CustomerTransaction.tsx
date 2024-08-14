import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colors, dimensions, styleUtils } from "../utils/styles";
import { Order } from "../models/OrderSchema";
import TextHighlight from "./TextHighlight";
import { formatDate } from "../utils/formatDate";
import CardOptions from "./CardOptions";
import { useRealm } from "@realm/react";
import { Customer } from "../models/CustomerSchema";
import WithCardOptions from "./Wrappers/WithCardOptions";

interface CustomerTransactionProps {
  transaction: Order;
  customer: Customer;
}

const CustomerTransaction: React.FC<CustomerTransactionProps> = ({
  transaction,
  customer,
}) => {
  const {
    order_price,
    order_date,
    carry_over,
    _id: order_id,
    paid_by_customer,
    balanceUpdate,
  } = transaction;

  const [optionsShown, setOptionsShown] = useState(false);
  const realm = useRealm();

  const onPressHandler = () => {
    if (transaction?.transactionType === "balanceUpdate") {
      return;
    }

    router.push({
      pathname: `/customers/orders/[order_id]`,
      params: {
        order_id: order_id.toString(),
        customer_id: customer._id.toString(),
      },
    });
  };

  const onLongPressHandler = () => {
    if (transaction?.transactionType === "balanceUpdate") {
      return;
    }
    setOptionsShown(true);
  };

  const onHideOption = () => {
    setOptionsShown(false);
  };

  const onDeleteOption = () => {
    realm.write(() => {
      // * first customer's balance need to be updated and then the transaction must be deleted.
      // * Otherwise we won't be able to access order.order_price if it's deleted first.
      customer.balance = customer.balance - +transaction.order_price!;
      realm.delete(transaction);
    });
  };

  const optionsView = () => {
    if (!optionsShown) return;
    return (
      <CardOptions hideOption={onHideOption} deleteOption={onDeleteOption} />
    );
  };

  let transactionDetailsView;
  if (transaction?.transactionType === "balanceUpdate" && balanceUpdate) {
    transactionDetailsView = () => {
      return (
        <View
          style={[
            styles.itemColumnContainer,
            { flex: 1, backgroundColor: colors.lightBlue2 },
          ]}
        >
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
              type={
                balanceUpdate.old_balance > balanceUpdate.new_balance
                  ? "warning"
                  : "success"
              }
              size="small"
              innerText="Old Balance"
              outerText={`$${balanceUpdate.old_balance}`}
            />
          </View>
          <View style={[styles.itemRowContainer, { marginTop: 10 }]}>
            <View style={{ ...styleUtils.flexRow }}>
              <Ionicons name="cash-sharp" size={20} color={colors.highlight} />
              <View style={{ marginLeft: 10 }}>
                <TextHighlight
                  type="highlight"
                  size="small"
                  innerText="Balance updated"
                />
              </View>
            </View>
            <TextHighlight
              type={
                balanceUpdate.new_balance > balanceUpdate.old_balance
                  ? "warning"
                  : "success"
              }
              size="small"
              innerText="New balance"
              outerText={`$${balanceUpdate.new_balance}`}
            />
          </View>
        </View>
      );
    };
  } else {
    transactionDetailsView = () => {
      return (
        <WithCardOptions containerDirection="row" optionsDirection="column">
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
                <Ionicons
                  name="pricetag"
                  size={20}
                  color={colors.lightGreen1}
                />
                <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                  ${order_price}
                </Text>
              </View>
              <TextHighlight
                type={carry_over! > 0 ? `warning` : `info`}
                size="small"
                innerText={carry_over! > 0 ? `Balance` : `Overpayment`}
                outerText={`$${carry_over}`}
              />
            </View>
          </View>
        </WithCardOptions>
      );
    };
  }

  return (
    <Pressable onPress={onPressHandler} onLongPress={onLongPressHandler}>
      {transactionDetailsView()}
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
  },
});
