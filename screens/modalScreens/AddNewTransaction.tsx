import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "../../utils/AppContext";
import WithCancelButton from "../../components/Buttons/WithCancelButton";
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
import Button from "../../components/Buttons/Button";
import MultipleButtons from "../../components/Buttons/MultipleButtons";
import { ButtonType } from "../../utils/types";
import AddedItems from "../../components/AddedItems";

const AddNewTransaction = () => {
  // const { formikAddCustomer } = useRealmContext();
  const { isAddTransactionModalOpen, showTransactionModal } =
    useGlobalContext();

  const [itemNumber, setItemNumber] = useState(0);

  const handleCloseModal = () => {
    console.log("The modal closed");

    showTransactionModal(false);
  };

  const transactionButtons: ButtonType[] = [
    {
      title: "Go back",
      color: "red",
      bgColor: "transparent",
      onPress: handleCloseModal,
    },
    {
      title: "Add Item",
      bgColor: "lightGreen1",
    },
  ];

  return (
    <Modal visible={isAddTransactionModalOpen} animationType="slide">
      <SafeAreaView style={styleUtils.flexContainer}>
        {/* Move this to it's own container */}
        <View>
          {/* Page Header */}
          <View style={styleUtils.headerTextContainer}>
            <Text style={styleUtils.headerText}>Date</Text>
          </View>
          <View style={{ ...styleUtils.cardContainer, width: "90%" }}>
            <Text style={styles.itemHeaderText}>
              Add Item : {itemNumber + 1}
            </Text>
            <View>
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
                  <Text style={styles.itemHeading}>
                    Total price of this item
                  </Text>
                  <Text style={styleUtils.subText}>
                    (Price per item X Quantity )
                  </Text>
                </View>
                <View
                  style={{
                    ...styleUtils.tag,
                    backgroundColor: colors.darkGray1,
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
              <MultipleButtons buttons={transactionButtons} />
            </View>
          </View>
        </View>
        {/* Added Items */}
        <AddedItems />
      </SafeAreaView>
    </Modal>
  );
};

export default AddNewTransaction;

const styles = StyleSheet.create({
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
