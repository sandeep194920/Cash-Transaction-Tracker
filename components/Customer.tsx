import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { colors, dimensions, styleUtils } from "../utils/styles";
import { Customer as CustomerSchema } from "../models/CustomerSchema";
import TextHighlight from "./TextHighlight";

interface CustomerProps {
  customer: CustomerSchema;
}

const Customer: React.FC<CustomerProps> = ({ customer }) => {
  const { name, _id: customer_id, balance } = customer;
  return (
    <View>
      <Pressable
        onPress={() =>
          router.push({
            pathname: `/customers/${customer_id.toString()}`,
            params: { customer_name: name },
          })
        }
      >
        <View style={styles.itemRowContainer}>
          <View>
            <Text style={styleUtils.largeText}>{name}</Text>
            <Text style={styleUtils.subText}>({customer_id.toString()})</Text>
          </View>
          <TextHighlight
            innerText="Outstanding"
            type="success"
            outerText="$100"
          />
        </View>
      </Pressable>
    </View>
  );
};

export default Customer;

const styles = StyleSheet.create({
  itemRowContainer: {
    ...styleUtils.itemRowContainer,
    padding: dimensions.paddingMedium,
    marginBottom: dimensions.marginMedium,
    backgroundColor: colors.lightGray1,
  },
});
