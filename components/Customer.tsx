import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { colors, dimensions, styleUtils } from "../utils/styles";
import { Customer as CustomerSchema } from "../models/CustomerSchema";
import TextHighlight from "./TextHighlight";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import WithCardOptions from "./Wrappers/WithCardOptions";
interface CustomerProps {
  customer: CustomerSchema;
}

const Customer: React.FC<CustomerProps> = ({ customer }) => {
  const { name, _id: customer_id, balance } = customer;
  const [showCustomerId, setShowCustomerId] = useState(false);

  return (
    <WithCardOptions optionsDirection="column">
      <View style={[styles.itemColumnContainer, { flex: 1 }]}>
        <Pressable
          onPress={() =>
            router.push({
              pathname: `/customers/${customer_id.toString()}`,
              params: { customer_name: name, balance },
            })
          }
        >
          <View style={styles.itemColumnContainer}>
            <View style={styleUtils.itemRowContainer}>
              <View
                style={{
                  ...styleUtils.itemRowContainer,
                }}
              >
                <Text>{name}</Text>
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
                outerText={`${balance}$`}
              />
            </View>

            {showCustomerId && (
              <View
                style={{
                  ...styleUtils.itemRowContainer,
                }}
              >
                <Text style={styleUtils.subText}>
                  (Customer ID - {customer_id.toString()})
                </Text>
              </View>
            )}
          </View>
        </Pressable>
      </View>
    </WithCardOptions>
  );
};

export default Customer;

const styles = StyleSheet.create({
  itemColumnContainer: {
    justifyContent: "space-between",
    paddingVertical: dimensions.paddingSmall3,
    paddingHorizontal: dimensions.paddingMedium,
    backgroundColor: colors.lightGray1,
  },
});
