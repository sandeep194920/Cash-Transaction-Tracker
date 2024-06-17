import { Modal, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "../../utils/AppContext";
import { styleUtils } from "../../utils/styles";
import MultipleButtons from "../../components/Buttons/MultipleButtons";
import { ItemAdded } from "../../utils/types";
import AddedItems from "../../components/AddedItems";
import AddTransactionInput from "../../components/AddTransactionInput";
import DatePicker from "../../components/DatePicker";

const AddNewTransaction = () => {
  const { isAddTransactionModalOpen, showTransactionModal } =
    useGlobalContext();

  const [itemsAdded, setItemsAdded] = useState<ItemAdded[]>([]);
  // ? If Item is in add mode, then currentItemInEdit mode will be null.
  // ? Else if Item is in edit mode, then currentItemInEdit mode will be an object that also contains id.
  const [currentItemInEdit, setCurrentItemInEdit] = useState<ItemAdded | null>(
    null
  );
  const [showAddItemInput, setShowAddItemInput] = useState(false);
  console.log("RERENDERING - now  currentItemInEdit is", currentItemInEdit);

  const handleCloseModal = () => {
    console.log("Closing modal");
    if (itemsAdded.length === 0) {
      showTransactionModal(false);
      setItemsAdded([]);
    } else {
      setShowAddItemInput(false);
    }
    setCurrentItemInEdit(null);
  };

  const handleAddItem = () => {
    setCurrentItemInEdit(null);
    setShowAddItemInput((prev) => !prev);
  };

  const handleItemAdded = (newItem: ItemAdded) => {
    setCurrentItemInEdit(null);
    setItemsAdded((prevItem) => [...prevItem, newItem]);
    setShowAddItemInput(false);
  };

  const handleItemRemove = (deleteItemId: string) => {
    const newItems = itemsAdded.filter((item) => item.id !== deleteItemId);
    setItemsAdded(newItems);
  };

  const handleItemEdit = (editItemId: string) => {
    const editableItem = itemsAdded.find((item) => item.id === editItemId);
    setCurrentItemInEdit(editableItem!);
    setShowAddItemInput(true);
  };

  const handleItemUpdate = (updatedItem: ItemAdded) => {
    setCurrentItemInEdit(null);
    const updatedItems = itemsAdded.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    console.log("REACHED HERE");

    setItemsAdded(updatedItems);
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
            <DatePicker />
          </View>
          {showAddItemInput || itemsAdded.length === 0 ? (
            <AddTransactionInput
              itemCurrentlyEditted={currentItemInEdit}
              // handleClose={
              //   itemsAdded.length === 0
              //     ? handleCloseModal
              //     : () => setShowAddItemInput(false)
              // }
              handleClose={handleCloseModal}
              itemNumber={itemsAdded.length}
              onItemAdded={handleItemAdded}
              onItemUpdate={handleItemUpdate}
            />
          ) : (
            <MultipleButtons
              buttons={[
                {
                  title: "Add next item",
                  bgColor: "lightGreen2",
                  onPress: handleAddItem,
                },
              ]}
            />
          )}
          {!showAddItemInput && (
            <AddedItems
              itemsAdded={itemsAdded}
              addItemsShown={showAddItemInput}
              onDeleteItem={handleItemRemove}
              onEditItem={handleItemEdit}
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
