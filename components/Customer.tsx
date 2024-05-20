import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { colors, styleUtils } from "../utils/styles";
import { Customer as CustomerSchema } from "../models/CustomerSchema";

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
        <View style={styleUtils.itemContainer}>
          <View>
            <Text style={styleUtils.largeText}>{name}</Text>
            <Text style={styleUtils.subText}>({customer_id.toString()})</Text>
          </View>

          <View style={styleUtils.columnContainer}>
            <View style={styleUtils.flexRow}>
              <View
                style={{
                  ...styleUtils.tag,
                  backgroundColor: 100 >= 0 ? colors.lightGreen1 : colors.red,
                }}
              >
                <Text style={styleUtils.tagText}>
                  {balance >= 0 ? "Overpayment " : "Outstanding"}
                </Text>
              </View>
              <Text style={{ fontWeight: "500" }}>$100</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default Customer;

// const styles = StyleSheet.create({});
