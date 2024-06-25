// SCREEN 2
import { View, FlatList, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import data from "../../data";
import CustomerTransaction from "../../components/CustomerTransaction";
import { styleUtils } from "../../utils/styles";
import WithAddButton from "../../components/Buttons/AddEditButton";
import { useQuery, useRealm, useUser } from "@realm/react";
import { useLocalSearchParams } from "expo-router";
import { Customer as CustomerSchema } from "../../models/CustomerSchema";
import { Order } from "../../models/OrderSchema";
import AddEditButton from "../../components/Buttons/AddEditButton";
import { useGlobalContext } from "../../utils/AppContext";
import AddNewTransaction from "../../screens/modalScreens/AddNewTransaction";

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

  console.log("The customer transactions are", customerTransactions);
  

  const { showTransactionModal } = useGlobalContext();

  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      <View style={styleUtils.headerTextContainer}>
        <Text style={styleUtils.headerText}>{customer_name}</Text>
        <Text style={styleUtils.smallText}>({customer_id})</Text>
      </View>
      <FlatList
        data={customerTransactions}
        renderItem={({ item }) => {
          return (
            <CustomerTransaction
              transaction={item}
              customer_id={customer_id.toString()}
              customer_name={customer_name.toString()}
            />
          );
        }}
      />
      <AddEditButton
        type="ADD"
        pressHandler={showTransactionModal.bind(this, true)}
      />
      {/* MODAL */}
      <AddNewTransaction />
    </SafeAreaView>
  );
};

export default CustomerTransactions;

const styles = StyleSheet.create({});
