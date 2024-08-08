import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import MultipleButtons from "../../components/Buttons/MultipleButtons";
import { Customer } from "../../models/CustomerSchema";
import TextHighlight from "../../components/TextHighlight";
import { dimensions, styleUtils, userFormStyles } from "../../utils/styles";
import { Formik } from "formik";
import { Balance } from "../../utils/FormValidators";

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

  const setBriefInfo = (message: keyof typeof INFO_MESSAGES) => {
    setInfo(INFO_MESSAGES[message]);
    setTimeout(() => {
      setInfo("");
    }, 1000);
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
            // onSubmit={onConfirmTransaction} // * - We can pass the values like amountPaid to parent component
            onSubmit={({ balance }) => {
              //   onConfirmTransaction(values);
              if (+balance === customer.balance) {
                return setBriefInfo("sameBalance");
              }
              console.log("REACHED", balance);
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
                          style={styles.amountPaidInput}
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
                      </View>
                    </View>
                  </View>
                  <Text>{info}</Text>
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
  amountPaidInput: {
    ...userFormStyles.textInput,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    minWidth: dimensions.mediumWidth1,
    paddingHorizontal: 20,
  },
});
