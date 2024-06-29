import { Modal, SafeAreaView, StyleSheet, View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { useGlobalContext } from "../../../utils/AppContext";
import { colors, dimensions, styleUtils } from "../../../utils/styles";
import MultipleButtons from "../../../components/Buttons/MultipleButtons";
import { ItemAdded } from "../../../utils/types";
import AddedItems from "../../../components/AddedItems";
import AddTransactionInput from "../../../components/AddTransactionInput";
import DatePicker from "../../../components/DatePicker";
import { useRealm, useUser } from "@realm/react";
import TextHighlight from "../../../components/TextHighlight";
import ConfirmTransaction from "./ConfirmTransaction";

const addedItems: ItemAdded[] = [
  {
    id: "112342",
    itemName: "Roti",
    price: 12,
    qty: 30,
    total: 12 * 30,
  },
  {
    id: "112232",
    itemName: "Curry",
    price: 12,
    qty: 1,
    total: 1 * 30,
  },
];

const AddNewTransaction = () => {
  const { isAddTransactionModalOpen, showTransactionModal } =
    useGlobalContext();

  const [isConfirmTransactionShown, setIsConfirmTransactionShown] =
    useState(false);

  const realm = useRealm();
  const user = useUser();

  const [itemsAdded, setItemsAdded] = useState<ItemAdded[]>(addedItems);
  // ? If Item is in add mode, then currentItemInEdit mode will be null.
  // ? Else if Item is in edit mode, then currentItemInEdit mode will be an object that also contains id.
  const [currentItemInEdit, setCurrentItemInEdit] = useState<ItemAdded | null>(
    null
  );
  const [showAddItemInput, setShowAddItemInput] = useState(false);
  const [date, setDate] = useState(new Date());
  const [newCarryOverAmount, setNewCarryOverAmount] = useState(0);

  const transactionTotalAmount = useMemo(() => {
    return itemsAdded.reduce((acc, current) => {
      return acc + parseFloat(current.total.toFixed(2));
    }, 0);
  }, [itemsAdded]);

  const handleCloseInputModal = () => {
    if (itemsAdded.length === 0) {
      return handleTransactionCloseModal();
    }
    setShowAddItemInput(false);
  };

  const handleTransactionCloseModal = () => {
    setShowAddItemInput(false);
    showTransactionModal(false);
    // setItemsAdded([]);
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

    setItemsAdded(updatedItems);
    setShowAddItemInput(false);
  };

  const handleItemsConfirm = () => {
    setIsConfirmTransactionShown(true);
  };

  const hideConfirmTransaction = () => {
    setIsConfirmTransactionShown(false);
  };

  // Method to create the transaction/Order
  const handleConfirmTransaction = () => {
    const transformedItems = itemsAdded.map(({ itemName, qty, price }) => ({
      name: itemName,
      quantity: +qty,
      price_per_item: +price,
    }));
    realm.write(() => {
      realm.create("Order", {
        _id: new Realm.BSON.ObjectId(),
        user_id: user.id,
        order_price: transactionTotalAmount,
        paid_by_customer: 101,
        customer_id: "664b2eefefe2d173655afce1",
        carry_over: -101,
        order_date: new Date(),
        items: transformedItems,
      });
    });
    hideConfirmTransaction();
    handleTransactionCloseModal();
  };

  return (
    <>
      <Modal visible={isAddTransactionModalOpen} animationType="slide">
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
            {/* Page Header */}
            <View style={{ ...styleUtils.headerTextContainer }}>
              <DatePicker date={date} setDate={setDate} />
            </View>
            {showAddItemInput || itemsAdded.length === 0 ? (
              <AddTransactionInput
                itemCurrentlyEditted={currentItemInEdit}
                handleClose={handleCloseInputModal}
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
                totalAmount={transactionTotalAmount}
                itemsAdded={itemsAdded}
                addItemsShown={showAddItemInput}
                onDeleteItem={handleItemRemove}
                onEditItem={handleItemEdit}
              />
            )}
          </View>
          <View>
            {itemsAdded.length > 0 && !showAddItemInput && (
              <View>
                <View style={styles.totalAmountSeperator}>
                  <View style={styles.separator}></View>
                  <View style={styleUtils.itemRowContainer}>
                    <Text style={styles.amountText}>Total Amount</Text>
                    <TextHighlight innerText="$100" type="info" size="medium" />
                  </View>
                </View>
                <View>
                  <MultipleButtons
                    buttons={[
                      {
                        title: "Cancel",
                        bgColor: "transparent",
                        color: "red",
                        onPress: handleTransactionCloseModal,
                      },
                      {
                        title: "Next",
                        bgColor: "lightGreen1",
                        onPress: handleItemsConfirm,
                      },
                    ]}
                  />
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
        {/* The ConfirmTransaction is a modal again which lives inside this main modal. 
        The logic here is, we want main modal to be always open and then conditionally show or hide
        ConfirmationTransaction Modal */}
        <ConfirmTransaction
          isConfirmTransactionShown={isConfirmTransactionShown}
          onHideConfirmation={hideConfirmTransaction}
          newCarryOver={`${newCarryOverAmount}`}
          onConfirmTransaction={handleConfirmTransaction}
        />
      </Modal>
    </>
  );
};

export default AddNewTransaction;

const styles = StyleSheet.create({
  amountText: {
    fontSize: dimensions.largeFont,
    fontWeight: "700",
  },
  separator: {
    borderBottomColor: colors.lightGray0,
    borderWidth: 1,
    marginVertical: 10,
  },
  totalAmountSeperator: {
    marginHorizontal: dimensions.marginLarge1,
    paddingVertical: 15,
  },
});
