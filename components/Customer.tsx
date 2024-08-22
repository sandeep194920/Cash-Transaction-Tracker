import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { colors, dimensions, styleUtils } from "../utils/styles";
import { Customer as CustomerSchema } from "../models/CustomerSchema";
import TextHighlight from "./TextHighlight";
import { MaterialIcons } from "@expo/vector-icons";
import WithCardOptions from "./Wrappers/WithCardOptions";
import useCardOptions from "../hooks/useCardOptions";
import { useQuery, useRealm } from "@realm/react";
import { Order } from "../models/OrderSchema";
interface CustomerProps {
  customer: CustomerSchema;
}

const Customer: React.FC<CustomerProps> = ({ customer }) => {
  const { name, _id: customer_id, balance } = customer;
  const [showCustomerId, setShowCustomerId] = useState(false);
  // const [showCardOptions, setShowCardOptions] = useState(false);
  const { isShowCardOptions, deleteHandler, showCardOptions, hideCardOptions } =
    useCardOptions();

  const realm = useRealm();

  const deletableOrders = useQuery(
    Order,
    (orders) => {
      return orders.filtered("customer_id == $0", customer_id.toString());
    },
    [customer_id]
  );

  const allCustomerOrders = deletableOrders.filter(
    (order) =>
      order.transactionType === "order" || order.transactionType === null
  );

  console.log("Deletable orders are", deletableOrders);

  const onDeleteHandler = () => {
    hideCardOptions();
    try {
      realm.write(() => {
        realm.delete(deletableOrders);
        realm.delete(customer);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onPressHandler = () =>
    router.push({
      pathname: `/customers/${customer_id.toString()}`,
      params: { customer_name: name, balance },
    });

  return (
    <WithCardOptions
      optionsDirection="column"
      onDeleteOption={() => {
        deleteHandler({
          header: "Do you want to delete this customer?",
          message: `You can't undo this once you delete the transaction. Do you want to continue?`,
          confirmDeleteCallback: onDeleteHandler,
        });
      }}
      onEditOption={onPressHandler}
      onHideOption={hideCardOptions}
      showCardOptions={isShowCardOptions}
    >
      <Pressable
        onLongPress={showCardOptions}
        style={styles.customerContainer}
        onPress={onPressHandler}
      >
        <View style={styleUtils.itemRowContainer}>
          <View style={[styleUtils.itemRowContainer]}>
            <Text style={styleUtils.mediumText}>{name}</Text>
            <MaterialIcons
              style={{
                top: -5,
              }}
              name={showCustomerId ? "arrow-drop-down" : "arrow-drop-up"}
              size={22}
              color={showCustomerId ? colors.lightBlue1 : colors.darkGray1}
              onPress={() => setShowCustomerId((prev) => !prev)}
            />
          </View>
          <TextHighlight
            type={balance > 0 ? "warning" : "success"}
            size="small"
            innerText={balance > 0 ? "Balance" : "Overpaid"}
            outerText={`${Math.abs(balance)}$`}
            outerTextStyle={{ fontWeight: "700" }}
          />
        </View>

        <View style={styleUtils.itemRowContainer}>
          <Text style={styleUtils.smallText}>Active Transactions</Text>
          <TextHighlight
            type="highlight"
            size="small"
            innerText={`${allCustomerOrders.length}`}
          />
        </View>

        {showCustomerId && (
          <View style={[styleUtils.itemRowContainer]}>
            <Text style={styleUtils.subText}>
              (Customer ID - {customer_id.toString()})
            </Text>
          </View>
        )}
      </Pressable>
    </WithCardOptions>
  );
};

export default Customer;

const styles = StyleSheet.create({
  customerContainer: {
    justifyContent: "space-between",
    gap: dimensions.marginLarge1,
    paddingVertical: dimensions.paddingSmall4,
    paddingHorizontal: dimensions.paddingMedium,
    backgroundColor: colors.lightGray1,
    flex: 1,
  },
});
