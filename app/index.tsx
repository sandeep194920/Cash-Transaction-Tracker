// SCREEN 1

import { FlatList, Pressable, SafeAreaView, View, Text } from "react-native";
import React from "react";
import Customer from "../components/Customer";
import { Customer as CustomerSchema } from "../models/CustomerSchema";
import AddEditButton from "../components/Buttons/AddEditButton";
import AddCustomer from "../components/EditableViews/AddCustomer";
import { useGlobalContext } from "../utils/AppContext";
import { colors, dimensions, styleUtils } from "../utils/styles";
import { StyleSheet } from "react-native";
import { useAuth, useQuery } from "@realm/react";

const Customers = () => {
  const { inputView } = useGlobalContext();
  // TODO: This component is only for Customers, so please move this logout functionality to one level upper
  const { logOut } = useAuth();
  const customers = useQuery(CustomerSchema);

  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => logOut()}>
          <Text style={styles.buttonText}>Sign out</Text>
        </Pressable>
      </View>
      {!inputView.isInput && (
        <>
          <FlatList
            data={customers}
            renderItem={({ item }) => {
              const customerProps = { ...item, _id: item._id.toString() };
              return <Customer {...customerProps} />;
            }}
          />
          <AddEditButton type="ADD" />
        </>
      )}
      {inputView.isInput && inputView.inputType === "ADD" && <AddCustomer />}
    </SafeAreaView>
  );
};

export default Customers;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 10,
  },
  buttonText: {
    color: colors.white,
    backgroundColor: colors.red,
    padding: dimensions.paddingSmall2,
    paddingHorizontal: dimensions.paddingSmall3,
    borderRadius: dimensions.borderRadius,
  },
});
