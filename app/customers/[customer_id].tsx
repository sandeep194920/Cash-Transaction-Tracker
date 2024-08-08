// SCREEN 2
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomerTransaction from "../../components/CustomerTransaction";
import { colors, styleUtils } from "../../utils/styles";
import { useObject, useQuery, useUser } from "@realm/react";
import { useLocalSearchParams } from "expo-router";
import { Order } from "../../models/OrderSchema";
import AddEditButton from "../../components/Buttons/AddEditButton";
import { useGlobalContext } from "../../utils/AppContext";
import AddOrEditTransaction from "../../screens/modalScreens/Transaction/AddOrEditTransaction";
import useAnimateEntry from "../../hooks/useAnimateEntry";
import TextHighlight from "../../components/TextHighlight";
import { Customer } from "../../models/CustomerSchema";
import { BSON } from "realm";
import { Feather, Ionicons } from "@expo/vector-icons";
import BalanceAdjust from "../../screens/modalScreens/BalanceAdjust";

const CustomerTransactions = () => {
  const { customer_id } = useLocalSearchParams();

  const [isBalanceModalShown, setIsBalanceModalShown] = useState(false);

  const user = useUser();
  const customer = useObject(
    Customer,
    new BSON.ObjectID(customer_id.toString())
  );

  // * Note - No need to wrap the below code customerTransactions in useMemo
  // * as useQuery takes care of that internally. However, if we are adding additional logic
  // * such as doing some more inside the useQuery like code commented below, then we can wrap it
  const customerTransactions = useQuery(Order, (orders) => {
    return orders.filtered(
      "user_id = $0 && customer_id = $1",
      user.id,
      customer_id
    );
  });

  const { animateRef } = useAnimateEntry(customerTransactions);

  const { showTransactionModal } = useGlobalContext();

  // the modal opens sometimes when we click on any customer, so we will let this be false initially
  useEffect(() => {
    showTransactionModal(false);
  }, []);

  if (!customer) return;

  const hideBalanceModal = () => {
    setIsBalanceModalShown(false);
  };

  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      <View style={styleUtils.headerTextContainer}>
        <Text style={styleUtils.headerText}>{customer.name}</Text>
        <Text style={styleUtils.smallText}>({customer_id})</Text>
      </View>
      {customerTransactions.length > 0 ? (
        <>
          <View
            style={{
              ...styleUtils.itemRowContainer,
              justifyContent: "space-between",
              alignSelf: "center",
              marginBottom: 20,
            }}
          >
            <Text style={styleUtils.mediumText}>
              has{" "}
              {+customer.balance === 0
                ? "no balance left"
                : +customer.balance > 0
                ? "a balance of"
                : "overpaid"}
              {"  "}
            </Text>
            {+customer.balance !== 0 && (
              <TextHighlight
                type={+customer.balance > 0 ? "warning" : "success"}
                innerText={`${customer.balance}$`}
              />
            )}

            <Feather
              style={{ marginLeft: 10 }}
              onPress={() => setIsBalanceModalShown(true)}
              name="edit"
              size={15}
              color={colors.black}
            />
          </View>
          <FlatList
            ref={animateRef}
            data={customerTransactions}
            renderItem={({ item }) => {
              return (
                <Animated.View>
                  <CustomerTransaction customer={customer} transaction={item} />
                </Animated.View>
              );
            }}
          />
        </>
      ) : (
        <View style={styles.noTransactions}>
          <Text style={styles.noTransactionsText}>
            Add your first transaction by clicking + icon below
          </Text>
        </View>
      )}
      <AddEditButton
        type="ADD"
        onPress={showTransactionModal.bind(this, true)}
      />
      {/* MODAL */}

      <AddOrEditTransaction customerID={customer_id.toString()} type="ADD" />
      <BalanceAdjust
        customer={customer}
        isBalanceModalShown={isBalanceModalShown}
        hideBalanceModal={hideBalanceModal}
      />
    </SafeAreaView>
  );
};

export default CustomerTransactions;

const styles = StyleSheet.create({
  noTransactions: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  noTransactionsText: {
    ...styleUtils.largeText,
    textAlign: "center",
    lineHeight: 27,
    padding: 50,
  },
});
