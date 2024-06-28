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
  const [amountPaid, setAmountPaid] = useState("0");

  return (
    <Modal visible={isConfirmTransactionShown} animationType="fade">
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
              {/* <View style={styleUtils.itemRowContainer}> */}
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
              <AntDesign name="infocirlce" size={20} color={colors.darkGray1} />
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
      </SafeAreaView>
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
    maxWidth: dimensions.smallWidth1,
    textAlign: "center",
    // alignSelf: "center",
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
