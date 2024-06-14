import { Modal, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "../../utils/AppContext";
import { colors, styleUtils } from "../../utils/styles";

import MultipleButtons from "../../components/Buttons/MultipleButtons";
import { ItemAdded } from "../../utils/types";
import AddedItems from "../../components/AddedItems";
import AddTransactionInput from "../../components/AddTransactionInput";
import { Feather } from "@expo/vector-icons";
import { DatePicker } from "../../components/DateTimePicker";

const AddNewTransaction = () => {
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
      <SafeAreaView
        style={{
          ...styleUtils.flexContainer,
          overflow: "hidden",
        }}
      >
        <View style={styleUtils.flexContainer}>
          {/* Page Header */}
          <View style={styleUtils.headerTextContainer}>
            <Text style={styleUtils.headerText}>
              {new Date().toDateString()}
            </Text>
            {/* <Feather name="edit" size={20} color={colors.lightBlue1} /> */}
            <DatePicker />
          </View>
          {showAddItemInput || itemsAdded.length === 0 ? (
            <AddTransactionInput
              handleClose={
                itemsAdded.length === 0
                  ? handleCloseModal
                  : () => setShowAddItemInput(false)
              }
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
          {!showAddItemInput && (
            <AddedItems
              itemsAdded={itemsAdded}
              addItemsShown={showAddItemInput}
            />
          )}
        </View>
      </SafeAreaView>
      {itemsAdded.length > 0 && !showAddItemInput && (
        <View style={{ flex: 0.1 }}>
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
        </View>
      )}
    </Modal>
  );
};

export default AddNewTransaction;

const styles = StyleSheet.create({});
