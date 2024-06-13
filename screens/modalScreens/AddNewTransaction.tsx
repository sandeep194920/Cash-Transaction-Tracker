import { Modal, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "../../utils/AppContext";
import { colors, dimensions, styleUtils } from "../../utils/styles";

import MultipleButtons from "../../components/Buttons/MultipleButtons";
import { ItemAdded } from "../../utils/types";
import AddedItems from "../../components/AddedItems";
import AddTransactionInput from "../../components/AddTransactionInput";

const AddNewTransaction = () => {
  // const { formikAddCustomer } = useRealmContext();
  const { isAddTransactionModalOpen, showTransactionModal } =
    useGlobalContext();

  const [itemNumber, setItemNumber] = useState(0);
  const [itemsAdded, setItemsAdded] = useState<ItemAdded[]>([]);

  const [showAddItemInput, setShowAddItemInput] = useState(false);
  const handleCloseModal = () => {
    showTransactionModal(false);
    setItemsAdded([]);
    setItemNumber(0);
  };

  const handleItemAdded = (newItem: ItemAdded) => {
    setItemsAdded((prevItem) => [...prevItem, newItem]);
    setItemNumber((prev) => prev + 1);
    setShowAddItemInput(false);
  };

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
          {showAddItemInput || itemsAdded.length === 0 ? (
            <AddTransactionInput
              handleClose={handleCloseModal}
              itemNumber={itemNumber}
              onItemAdded={handleItemAdded}
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
          <AddedItems
            itemsAdded={itemsAdded}
            addItemsShown={showAddItemInput}
          />
        </View>
        {!showAddItemInput ||
          (itemsAdded.length !== 0 && (
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
          ))}
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
