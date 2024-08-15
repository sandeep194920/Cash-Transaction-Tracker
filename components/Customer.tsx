import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { colors, dimensions, styleUtils } from "../utils/styles";
import { Customer as CustomerSchema } from "../models/CustomerSchema";
import TextHighlight from "./TextHighlight";
import { MaterialIcons } from "@expo/vector-icons";
import WithCardOptions from "./Wrappers/WithCardOptions";
import useCardOptions from "../hooks/useCardOptions";
interface CustomerProps {
  customer: CustomerSchema;
}

const Customer: React.FC<CustomerProps> = ({ customer }) => {
  const { name, _id: customer_id, balance } = customer;
  const [showCustomerId, setShowCustomerId] = useState(false);
  // const [showCardOptions, setShowCardOptions] = useState(false);
  const { isShowCardOptions, deleteHandler, showCardOptions, hideCardOptions } =
    useCardOptions();

  const onDeleteHandler = () => {
    hideCardOptions();
  };

  return (
    <WithCardOptions
      optionsDirection="column"
      onHideOption={hideCardOptions}
      onDeleteOption={() => {
        deleteHandler({
          header: "Do you want to delete this customer?",
          message: `You can't undo this once you delete the transaction. Do you want to continue?`,
          confirmDeleteCallback: onDeleteHandler,
        });
      }}
      showCardOptions={isShowCardOptions}
    >
      <Pressable
        onLongPress={showCardOptions}
        style={styles.customerContainer}
        onPress={() =>
          router.push({
            pathname: `/customers/${customer_id.toString()}`,
            params: { customer_name: name, balance },
          })
        }
      >
        <View style={styles.nameBalanceRow}>
          <View style={[styleUtils.itemRowContainer]}>
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
    paddingVertical: dimensions.paddingSmall4,
    paddingHorizontal: dimensions.paddingMedium,
    backgroundColor: colors.lightGray1,
    flex: 1,
  },
  nameBalanceRow: {
    ...styleUtils.itemRowContainer,
    marginBottom: dimensions.paddingSmall4,
  },
});
