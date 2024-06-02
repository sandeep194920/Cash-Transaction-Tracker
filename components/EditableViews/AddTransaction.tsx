import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "../../utils/AppContext";
import WithCancelButton from "../Buttons/WithCancelButton";
import {
  colors,
  dimensions,
  styleUtils,
  userFormStyles,
} from "../../utils/styles";
import {
  MaterialIcons,
  Ionicons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import { useRealmContext } from "../../utils/RealmContext";
import Button from "../Buttons/Button";

const AddTransaction = () => {
  // const { formikAddCustomer } = useRealmContext();
  const { isAddTransactionModalOpen, showTransactionModal } =
    useGlobalContext();

  const [itemNumber, setItemNumber] = useState(0);

  return (
    <Modal visible={isAddTransactionModalOpen} animationType="slide">
      <SafeAreaView style={styleUtils.flexContainer}>
        {/* Page Header */}
        <View style={styleUtils.headerTextContainer}>
          <Text style={styleUtils.headerText}>Add New Transaction</Text>
        </View>
        {/* Form Per Item */}
        <View style={styles.itemContainer}>
          <Text style={styles.itemHeaderText}>Add Item : {itemNumber + 1}</Text>
          <View>
            {/* item row */}
            <View style={styles.itemRowContainer}>
              <Text style={styles.itemHeading}>Item name</Text>
              <TextInput style={styles.itemInput} />
            </View>

            <View style={styles.itemRowContainer}>
              <Text style={styles.itemHeading}>Price per item</Text>
              <TextInput style={styles.itemInput} />
            </View>

            <View style={styles.itemRowContainer}>
              <Text style={styles.itemHeading}>Quantity</Text>
              <TextInput style={styles.itemInput} />
            </View>

            <View style={styles.itemRowContainer}>
              <View>
                <Text style={styles.itemHeading}>Total price of this item</Text>
                <Text style={styleUtils.subText}>
                  (Price per item X Quantity )
                </Text>
              </View>
              <View
                style={{
                  ...styleUtils.tag,
                  backgroundColor: colors.lightGreen2,
                }}
              >
                <Text
                  style={{
                    ...styleUtils.tagText,
                    fontSize: dimensions.smallFont1,
                    fontWeight: "600",
                  }}
                >
                  {200}
                </Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Add Item"
                bgColor={colors.lightGreen1}
                color={colors.white}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  itemContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 5,
    backgroundColor: colors.lightGray0,
    padding: 20,
    ...styleUtils.smallShadow,
  },
  itemHeaderText: {
    fontSize: dimensions.largeFont,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  itemRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },

  itemHeading: {
    fontWeight: "600",
    fontSize: dimensions.mediumFont,
  },
  itemInput: {
    borderColor: colors.lightGreen1,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 160,
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});



