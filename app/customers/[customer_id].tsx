// SCREEN 2
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
} from "react-native";
import React, { useEffect } from "react";
import CustomerTransaction from "../../components/CustomerTransaction";
import { styleUtils } from "../../utils/styles";
import { useQuery, useRealm, useUser } from "@realm/react";
import { useLocalSearchParams } from "expo-router";
import { Customer as CustomerSchema } from "../../models/CustomerSchema";
import { Order } from "../../models/OrderSchema";
import AddEditButton from "../../components/Buttons/AddEditButton";
import { useGlobalContext } from "../../utils/AppContext";
import AddOrEditTransaction from "../../screens/modalScreens/Transaction/AddOrEditTransaction";
import useAnimateEntry from "../../hooks/useAnimateEntry";

const CustomerTransactions = () => {
  const { customer_id, customer_name } = useLocalSearchParams();
  console.log("The customer_id here is", customer_id);

  const user = useUser();

  const customerTransactions = useQuery(Order, (orders) => {
    return orders.filtered(
      "user_id = $0 && customer_id = $1",
      user.id,
      customer_id
    );
  });

  const { showTransactionModal } = useGlobalContext();

  // the modal opens sometimes when we click on any customer, so we will let this be false initially
  useEffect(() => {
    showTransactionModal(false);
  }, []);

  const { animateRef, flashAnim } = useAnimateEntry(customerTransactions);

  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      <View style={styleUtils.headerTextContainer}>
        <Text style={styleUtils.headerText}>{customer_name}</Text>
        <Text style={styleUtils.smallText}>({customer_id})</Text>
      </View>
      <FlatList
        ref={animateRef}
        data={customerTransactions}
        renderItem={({ item, index }) => {
          const isLastItem = index === customerTransactions.length - 1;
          return (
            <Animated.View style={isLastItem ? { opacity: flashAnim } : null}>
              <CustomerTransaction
                transaction={item}
                customer_id={customer_id.toString()}
                customer_name={customer_name.toString()}
              />
            </Animated.View>
          );
        }}
      />
      <AddEditButton
        type="ADD"
        onPress={showTransactionModal.bind(this, true)}
      />
      {/* MODAL */}
      <AddOrEditTransaction type="ADD" />
    </SafeAreaView>
  );
};

export default CustomerTransactions;

const styles = StyleSheet.create({});
