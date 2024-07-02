import { Modal, SafeAreaView, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useGlobalContext } from "../../../utils/AppContext";
import { colors, dimensions, styleUtils } from "../../../utils/styles";
import MultipleButtons from "../../../components/Buttons/MultipleButtons";
import { ItemAddedInFeFormat, ItemInBeFormat } from "../../../utils/types";
import AddedItems from "../../../components/AddedItems";
import AddTransactionInput from "../../../components/AddTransactionInput";
import DatePicker from "../../../components/DatePicker";
import { useRealm, useUser } from "@realm/react";
import TextHighlight from "../../../components/TextHighlight";
import ConfirmTransaction from "./ConfirmTransaction";
import { itemsToBeFormat } from "../../../utils/transformItems";

// TODO: Remove this test code block of addedItems later
const addedItems: ItemAddedInFeFormat[] = [
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

type TransactionEdit = {
  type: "EDIT";
  order: any;
  handleCloseEditMode: () => void;
};

type TransactionAdd = {
  type: "ADD";
};

type TransactionProps = TransactionAdd | TransactionEdit;

const AddOrEditTransaction = ({ type = "ADD", ...props }: TransactionProps) => {
  const { isTransactionModalOpen, showTransactionModal } = useGlobalContext();

  const [isConfirmTransactionShown, setIsConfirmTransactionShown] =
    useState(false);

  const realm = useRealm();
  const user = useUser();

  const [itemsAdded, setItemsAdded] =
    useState<ItemAddedInFeFormat[]>(addedItems);
  // ? If Item is in add mode, then currentItemInEdit mode will be null.
  // ? Else if Item is in edit mode, then currentItemInEdit mode will be an object that also contains id.
  const [currentItemInEdit, setCurrentItemInEdit] =
    useState<ItemAddedInFeFormat | null>(null);
  const [showAddItemInput, setShowAddItemInput] = useState(false);
  const [date, setDate] = useState(new Date());
  // TODO: May be remove the carryover amount state here and handle that properly. I guess it should come from other place
  // You can still use this state to set the state but init state should come from backend
  const [newCarryOverAmount, setNewCarryOverAmount] = useState(100);

  const { order, handleCloseEditMode } = props as TransactionEdit;

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
    handleCloseEditMode();
  };

  const handleAddItem = () => {
    setCurrentItemInEdit(null);
    setShowAddItemInput((prev) => !prev);
  };

  const handleItemAdded = (newItem: ItemAddedInFeFormat) => {
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

  const handleItemUpdate = (updatedItem: ItemAddedInFeFormat) => {
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
  const handleConfirmTransaction = ({ amountPaid }: { amountPaid: number }) => {
    // const transformedItems = itemsAdded.map(({ itemName, qty, price }) => ({
    //   name: itemName,
    //   quantity: +qty,
    //   price_per_item: +price,
    // }));
    const transformedItems = itemsToBeFormat(itemsAdded);
    realm.write(() => {
      realm.create("Order", {
        _id: new Realm.BSON.ObjectId(),
        user_id: user.id,
        order_price: transactionTotalAmount,
        paid_by_customer: +amountPaid,
        customer_id: "664b2eefefe2d173655afce1",
        carry_over: -111,
        order_date: new Date(),
        items: transformedItems,
      });
    });
    setItemsAdded([]);
    hideConfirmTransaction();
    handleTransactionCloseModal();
  };

  // IF type === "EDIT"
  // ORDERID = 66818023eaf42b5f25ab7423

  useEffect(() => {
    if (type !== "EDIT") return;
    console.log("Order items", order.items);
    const newItems = order.items.map((item: ItemInBeFormat) => item);
    console.log("The new items", newItems);
  }, [isTransactionModalOpen]);

  return (
    <>
      <Modal visible={isTransactionModalOpen} animationType="slide">
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
                    <TextHighlight
                      innerText={`$ ${transactionTotalAmount}`}
                      type="info"
                      size="medium"
                    />
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
          transactionTotalAmount={transactionTotalAmount}
          newCarryOver={newCarryOverAmount}
          onConfirmTransaction={handleConfirmTransaction}
        />
      </Modal>
    </>
  );
};

export default AddOrEditTransaction;

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
