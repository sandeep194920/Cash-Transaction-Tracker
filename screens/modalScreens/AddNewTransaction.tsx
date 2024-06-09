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
import AddTransactionInput from "../../components/AddTransactionInput";

const AddNewTransaction = () => {
  // const { formikAddCustomer } = useRealmContext();
  const { isAddTransactionModalOpen, showTransactionModal } =
    useGlobalContext();

  const [itemNumber, setItemNumber] = useState(0);

  const [showAddItemInput, setShowAddItemInput] = useState(false);
  const handleCloseModal = () => {
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
        <View style={styleUtils.flexContainer}>
          {/* Page Header */}
          <View style={styleUtils.headerTextContainer}>
            <Text style={styleUtils.headerText}>
              {new Date().toDateString()}
            </Text>
          </View>
          {showAddItemInput ? (
            <AddTransactionInput
              handleClose={handleCloseModal}
              itemNumber={itemNumber}
            />
          ) : (
            <MultipleButtons
              buttons={[
                {
                  title: "Add next item",
                  bgColor: "lightGreen2",
                  onPress: () => setShowAddItemInput((prev) => !prev),
                },
              ]}
            />
          )}
          <AddedItems addItemsShown={showAddItemInput} />
        </View>
        {!showAddItemInput && (
          <MultipleButtons
            buttons={[
              {
                title: "Cancel",
                bgColor: "transparent",
                color: "red",
                onPress: handleCloseModal,
              },
              { title: "Confirm Items", bgColor: "lightGreen1" },
            ]}
          />
        )}
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
    ...styleUtils.itemRowContainer,
    padding: dimensions.paddingSmall3,
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
