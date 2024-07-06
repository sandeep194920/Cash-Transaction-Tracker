import {
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import {
  colors,
  dimensions,
  styleUtils,
  userFormStyles,
} from "../../../utils/styles";
import TextHighlight from "../../../components/TextHighlight";
import MultipleButtons from "../../../components/Buttons/MultipleButtons";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import { PriceSchema } from "../../../utils/FormValidators";
import { formatDate } from "../../../utils/formatDate";

interface ConfirmTransactionProps {
  isConfirmTransactionShown: boolean;
  onHideConfirmation: () => void;
  newCarryOver: number;
  onConfirmTransaction: ({ amountPaid }: { amountPaid: number }) => void;
  transactionTotalAmount: number;
  orderDate: Date;
}

const ConfirmTransaction = ({
  isConfirmTransactionShown,
  onHideConfirmation,
  newCarryOver,
  onConfirmTransaction,
  transactionTotalAmount,
  orderDate,
}: ConfirmTransactionProps) => {
  return (
    <Modal visible={isConfirmTransactionShown} animationType="fade">
      <Formik
        enableReinitialize
        initialValues={{
          amountPaid: 0,
        }}
        validationSchema={PriceSchema}
        // onSubmit={onConfirmTransaction} // * - We can pass the values like amountPaid to parent component
        onSubmit={(values) => {
          onConfirmTransaction(values);
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
                <View style={{ ...styleUtils.headerTextContainer }}>
                  <Text
                    style={{
                      ...styleUtils.headerText,
                    }}
                  >
                    Confirm Transaction
                  </Text>
                </View>

                <View style={styles.itemsContainer}>
                  <View style={styleUtils.itemRowContainer}>
                    <Text>Transaction date</Text>
                    <Text>{formatDate(orderDate).date}</Text>
                  </View>

                  <View style={styleUtils.itemRowContainer}>
                    <Text>Today's Total Amount</Text>
                    <TextHighlight
                      innerText={`$ ${transactionTotalAmount}`}
                      type="info"
                      size="medium"
                    />
                  </View>

                  <View style={styleUtils.itemRowContainer}>
                    <Text>Carry over amount so far</Text>
                    <TextHighlight
                      innerText="$ 100"
                      type="warning"
                      size="medium"
                    />
                  </View>

                  <View style={styles.carryOverContainer}>
                    <View style={styles.descriptionTextContainer}>
                      <AntDesign
                        name="infocirlce"
                        size={15}
                        color={colors.darkGray1}
                      />
                      <Text style={styles.description}>
                        Customer's balance amount
                      </Text>
                    </View>
                    <TextHighlight
                      innerText={`$ ${newCarryOver - transactionTotalAmount}`}
                      type="warning"
                    />
                  </View>

                  <View
                    style={{
                      gap: 20,
                      marginTop: 20,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styleUtils.mediumText}>
                      How much did the customer pay today?
                    </Text>
                    <TextInput
                      onBlur={handleBlur("amountPaid")}
                      onChangeText={handleChange("amountPaid")}
                      style={styles.amountPaidInput}
                      keyboardType="numeric"
                      value={
                        values.amountPaid === 0 ? "" : `${values.amountPaid}`
                      }
                      placeholder="0"
                      defaultValue="0"
                    />
                    <View>
                      <Text style={userFormStyles.error}>
                        {touched.amountPaid && errors.amountPaid}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <MultipleButtons
                  buttons={[
                    {
                      title: "Go back",
                      color: "red",
                      bgColor: "transparent",
                      onPress: onHideConfirmation,
                    },
                    {
                      title: "Confirm Transaction",
                      color: "white",
                      bgColor: "lightGreen1",
                      onPress: handleSubmit,
                    },
                  ]}
                />
              </View>
            </SafeAreaView>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default ConfirmTransaction;

const styles = StyleSheet.create({
  itemsContainer: {
    padding: 15,
    gap: 25,
    flex: 1,
  },

  amountPaidInput: {
    ...userFormStyles.textInput,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    minWidth: dimensions.mediumWidth1,
    paddingHorizontal: 20,
  },
  carryOverContainer: {
    ...styleUtils.itemRowContainer,
    backgroundColor: colors.lightGray0,
    padding: 10,
    marginBottom: 20,
  },
  descriptionTextContainer: {
    ...styleUtils.itemRowContainer,
    gap: 10,
  },
  description: {
    ...styleUtils.smallText,
  },
});
