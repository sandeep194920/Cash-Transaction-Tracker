import {
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
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

interface ConfirmTransactionProps {
  isConfirmTransactionShown: boolean;
  onHideConfirmation: () => void;
  newCarryOver: string;
}

const ConfirmTransaction = ({
  isConfirmTransactionShown,
  onHideConfirmation,
  newCarryOver,
}: ConfirmTransactionProps) => {
  return (
    <Modal visible={isConfirmTransactionShown} animationType="fade">
      <Formik
        enableReinitialize
        initialValues={{
          amountPaid: 0,
        }}
        validationSchema={PriceSchema}
        onSubmit={() => {
          console.log("Submitting the transaction");
        }}
      >
        {({
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
          handleSubmit,
          // resetForm, // TODO: this didnt help me in clearing the values. Will come back to this if I have time
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
                    <Text>{new Date().toDateString()}</Text>
                  </View>

                  <View style={styleUtils.itemRowContainer}>
                    <Text>Today's Total Amount</Text>
                    <TextHighlight
                      innerText="$ 100"
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
                      value={`${values.amountPaid}`}
                      placeholder="Amount paid"
                    />
                    <View>
                      <Text
                        style={{
                          ...userFormStyles.error,
                          alignSelf: "center",
                        }}
                      >
                        {touched.amountPaid && errors.amountPaid}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <View style={styles.carryOverContainer}>
                  <View style={styles.descriptionTextContainer}>
                    <AntDesign
                      name="infocirlce"
                      size={20}
                      color={colors.darkGray1}
                    />
                    <Text style={styles.description}>
                      The new carryover amount is
                    </Text>
                  </View>
                  <TextHighlight innerText="$ 200" type="warning" />
                </View>
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
    // fontStyle: "italic",
  },
});

{
  /* <SafeAreaView
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
                <Text>{new Date().toDateString()}</Text>
              </View>

              <View style={styleUtils.itemRowContainer}>
                <Text>Today's Total Amount</Text>
                <TextHighlight innerText="$ 100" type="info" size="medium" />
              </View>

              <View style={styleUtils.itemRowContainer}>
                <Text>Carry over amount so far</Text>
                <TextHighlight innerText="$ 100" type="warning" size="medium" />
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
                  style={styles.amountPaidInput}
                  onChangeText={setAmountPaid}
                  keyboardType="numeric"
                  value={`${amountPaid}`}
                  placeholder="Phone"
                />
              </View>
            </View>
          </View>
          <View>
            <View style={styles.carryOverContainer}>
              <View style={styles.descriptionTextContainer}>
                <AntDesign
                  name="infocirlce"
                  size={20}
                  color={colors.darkGray1}
                />
                <Text style={styles.description}>
                  The new carryover amount is
                </Text>
              </View>
              <TextHighlight innerText="$ 200" type="warning" />
            </View>
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
                },
              ]}
            />
          </View>
        </SafeAreaView> */
}