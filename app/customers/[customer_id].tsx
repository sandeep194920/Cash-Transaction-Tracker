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
import { styleUtils } from "../../utils/styles";
import { useQuery, useUser } from "@realm/react";
import { useLocalSearchParams } from "expo-router";
import { Order } from "../../models/OrderSchema";
import AddEditButton from "../../components/Buttons/AddEditButton";
import { useGlobalContext } from "../../utils/AppContext";
import AddOrEditTransaction from "../../screens/modalScreens/Transaction/AddOrEditTransaction";
import useAnimateEntry from "../../hooks/useAnimateEntry";

const CustomerTransactions = () => {
  const { customer_id, customer_name } = useLocalSearchParams();
  const user = useUser();

  console.log("The customer_id here is", customer_id);

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

  // ! Memoize the customerTransactions array if needed for transformations
  // const memoizedTransactions = useMemo(() => {
  //   return customerTransactions.map(transaction => ({
  //     ...transaction,
  //  Any additional transformation
  //   }));
  // }, [customerTransactions]);

  // TODO: highlight added/modified item
  // const [recentlyModifiedOrder, setRecentlyModifiedOrder] = useState<
  //   null | string
  // >(null);
  const { animateRef, flashAnim } = useAnimateEntry(customerTransactions);

  const { showTransactionModal } = useGlobalContext();

  // the modal opens sometimes when we click on any customer, so we will let this be false initially
  useEffect(() => {
    showTransactionModal(false);
  }, []);

  // console.log(
  //   "The recently modified order",
  //   recentlyModifiedOrder,
  //   " item id is",
  //   customerTransactions
  // );

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
          // console.log("the recently modified order is", recentlyModifiedOrder);

          // console.log("The item is", item._id);

          // const isLastItem = index === customerTransactions.length - 1;
          return (
            <Animated.View
            // style={
            //   recentlyModifiedOrder?.toString() === item._id.toString()
            //     ? { opacity: flashAnim }
            //     : null
            // }
            >
              <CustomerTransaction
                // setRecentlyModifiedOrder={setRecentlyModifiedOrder}
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

      <AddOrEditTransaction customerID={customer_id.toString()} type="ADD" />
    </SafeAreaView>
  );
};

export default CustomerTransactions;

const styles = StyleSheet.create({});
