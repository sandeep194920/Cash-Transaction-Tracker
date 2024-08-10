import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import MultipleButtons from "../../components/Buttons/MultipleButtons";
import { Customer } from "../../models/CustomerSchema";
import TextHighlight from "../../components/TextHighlight";
import {
  colors,
  dimensions,
  styleUtils,
  userFormStyles,
} from "../../utils/styles";
import { Formik } from "formik";
import { Balance } from "../../utils/FormValidators";
import { Ionicons } from "@expo/vector-icons";
import { useRealm, useUser } from "@realm/react";

interface BalanceAdjustProps {
  customer: Customer;
  isBalanceModalShown: boolean;
  hideBalanceModal: () => void;
}

const INFO_MESSAGES = {
  ["sameBalance"]: "Balance must be differenet from the current one",
};

const BalanceAdjust: React.FC<BalanceAdjustProps> = ({
  customer,
  isBalanceModalShown,
  hideBalanceModal,
}) => {
  const [info, setInfo] = useState("");
  const realm = useRealm();

  const setBriefInfo = (message: keyof typeof INFO_MESSAGES) => {
    setInfo(INFO_MESSAGES[message]);
    setTimeout(() => {
      setInfo("");
    }, 4000);
  };

  const confirmBlanceAlert = (newBalance: number) => {
    Alert.alert(
      "Are you sure you want to update the balance?",
      `You're updating the balance of this customer from ${customer.balance} to ${newBalance} and this cannot be reversed`,
      [
        {
          text: "Cancel",
          style: "destructive",
        },
        {
          text: "Update the balance",
          onPress: () => confirmBalanceHandler(newBalance),
        },
      ]
    );
  };
  const user = useUser();

  const confirmBalanceHandler = (newBalance: number) => {
    realm.write(() => {
      realm.create("Order", {
        _id: new Realm.BSON.ObjectId(),
        user_id: user.id,
        order_date: new Date(),
        transactionType: "balanceUpdate",
        customer_id: customer._id.toString(),
        balanceUpdate: {
          old_balance: customer.balance,
          new_balance: +newBalance,
        },

        // OPTIONAL FILEDS
        order_price: -1,
        paid_by_customer: -1,
        carry_over: -1,
        items: [],
      });
      customer.balance = +newBalance;
    });

    hideBalanceModal();
  };

  return (
    <Modal visible={isBalanceModalShown}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ ...styleUtils.headerTextContainer }}>
          <Text
            style={{
              ...styleUtils.headerText,
            }}
          >
            Adjust the Balance
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <View style={[styleUtils.itemRowContainer, { gap: 5 }]}>
            <Text>The current balance is </Text>
            <TextHighlight
              innerText={`$ ${customer.balance}`}
              type="info"
              size="medium"
            />
          </View>
          <Formik
            enableReinitialize
            initialValues={{
              balance: 0,
            }}
            validationSchema={Balance}
            onSubmit={({ balance }) => {
              // this is a string so let's first convert that to number
              balance = +balance;
              if (balance === customer.balance) {
                return setBriefInfo("sameBalance");
              }
              confirmBlanceAlert(balance);
            }}
          >
            {({
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
              handleSubmit,
            }) => {
              return (
                <SafeAreaView
                  style={{
                    ...styleUtils.flexContainer,
                  }}
                >
                  <View
                    style={{
                      ...styleUtils.flexContainer,
                    }}
                  >
                    <View>
                      <View
                        style={{
                          gap: 20,
                          marginTop: 20,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styleUtils.mediumText}>
                          What's the new balance of this customer?
                        </Text>
                        <TextInput
                          onBlur={handleBlur("balance")}
                          onChangeText={handleChange("balance")}
                          style={styles.balanceInput}
                          keyboardType="numeric"
                          value={`${values.balance}`}
                          placeholder="0"
                          defaultValue="0"
                        />
                        <View>
                          <Text style={userFormStyles.error}>
                            {touched.balance && errors.balance}
                          </Text>
                        </View>
                        {info && (
                          <View style={styles.alertContainer}>
                            <Ionicons
                              color={colors.red}
                              name="information-circle"
                              size={24}
                            />
                            <Text style={styles.alertText}>{info}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                  <MultipleButtons
                    buttons={[
                      {
                        title: "Cancel",
                        bgColor: "red",
                        onPress: hideBalanceModal,
                      },
                      {
                        title: "Update Balance",
                        bgColor: "lightGreen1",
                        onPress: handleSubmit,
                      },
                    ]}
                  />
                </SafeAreaView>
              );
            }}
          </Formik>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default BalanceAdjust;

const styles = StyleSheet.create({
  balanceInput: {
    ...userFormStyles.textInput,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    minWidth: dimensions.mediumWidth1,
    paddingHorizontal: 20,
  },
  alertContainer: {
    backgroundColor: colors.lightGray0,
    ...styleUtils.itemRowContainer,
    gap: dimensions.smallMargin,
  },
  alertText: {
    color: colors.red,
  },
});
