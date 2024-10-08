import { Modal, SafeAreaView, StyleSheet, View, Text } from "react-native";
import React, { Dispatch, useEffect, useMemo, useState } from "react";
import { useGlobalContext } from "../../../utils/AppContext";
import { colors, dimensions, styleUtils } from "../../../utils/styles";
import MultipleButtons from "../../../components/Buttons/MultipleButtons";
import { ItemAddedInFeFormat, ItemInBeFormat } from "../../../utils/types";
import AddedItems from "../../../components/AddedItems";
import AddTransactionInput from "../../../components/AddTransactionInput";
import DatePicker from "../../../components/DatePicker";
import { useObject, useRealm, useUser } from "@realm/react";
import TextHighlight from "../../../components/TextHighlight";
import ConfirmTransaction from "./ConfirmTransaction";
import {
  itemsToBeFormat,
  itemsToFeFormat,
} from "../../../utils/transformItems";
import { Customer } from "../../../models/CustomerSchema";
import { BSON } from "realm";

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

type CommonProps = {
  customerID: string;
};

type TransactionProps = (TransactionAdd | TransactionEdit) & CommonProps;

const AddOrEditTransaction = ({
  type = "ADD",
  customerID,
  ...props
}: TransactionProps) => {
  const { isTransactionModalOpen, showTransactionModal } = useGlobalContext();

  const [isConfirmTransactionShown, setIsConfirmTransactionShown] =
    useState(false);

  const realm = useRealm();
  const user = useUser();

  const [itemsAdded, setItemsAdded] = useState<ItemAddedInFeFormat[]>([]);
  // ? If Item is in add mode, then currentItemInEdit mode will be null.
  // ? Else if Item is in edit mode, then currentItemInEdit mode will be an object that also contains id.
  const [currentItemInEdit, setCurrentItemInEdit] =
    useState<ItemAddedInFeFormat | null>(null);
  const [showAddItemInput, setShowAddItemInput] = useState(false);
  const [orderDate, setOrderDate] = useState(new Date());
  // TODO: May be remove the carryover amount state here and handle that properly. I guess it should come from other place
  // You can still use this state to set the state but init state should come from backend
  const [newCarryOverAmount, setNewCarryOverAmount] = useState(100);

  const { order, handleCloseEditMode } = props as TransactionEdit;

  const customer = useObject(Customer, new BSON.ObjectID(customerID));

  if (!customer) return;

  console.log("The customer id in AddOrEditTransaction is", customerID);

  console.log("The customer from db in", customer);

  const transactionTotalAmount = useMemo(() => {
    return itemsAdded.reduce((acc, current) => {
      return acc + parseFloat(current.total.toFixed(2));
    }, 0);
  }, [itemsAdded]);

  // if order exists
  const updatedTransactionTotalAmount = useMemo(() => {
    if (order) {
      return transactionTotalAmount - order.order_price;
    }
    return transactionTotalAmount;
  }, [order, transactionTotalAmount]);

  const newBalance = useMemo(() => {
    return customer.balance + updatedTransactionTotalAmount;
  }, [transactionTotalAmount, customer]);

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
    handleCloseEditMode && handleCloseEditMode();
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
    console.log("REACHED");

    setIsConfirmTransactionShown(true);
  };

  const hideConfirmTransaction = () => {
    setIsConfirmTransactionShown(false);
  };

  // Method to create the transaction/Order
  const handleConfirmNewTransaction = ({
    amountPaid,
  }: {
    amountPaid: number;
  }) => {
    const transformedItems = itemsToBeFormat(itemsAdded);

    realm.write(() => {
      realm.create("Order", {
        _id: new Realm.BSON.ObjectId(),
        user_id: user.id,
        order_price: transactionTotalAmount,
        paid_by_customer: +amountPaid,
        customer_id: customerID,
        transactionType: "",
        carry_over: customer
          ? customer.balance + transactionTotalAmount - +amountPaid
          : 0,
        order_date: orderDate,
        items: transformedItems,
      });
      customer.balance =
        customer.balance + transactionTotalAmount - +amountPaid;
    });
    setItemsAdded([]);
    hideConfirmTransaction();
    handleTransactionCloseModal();
  };

  // Method to update the transaction/Order
  const handleConfirmExistingTransaction = ({
    amountPaid,
  }: {
    amountPaid: number;
  }) => {
    const transformedItems = itemsToBeFormat(itemsAdded);
    realm.write(() => {
      order.items = transformedItems;
      order.paid_by_customer = order.paid_by_customer + +amountPaid;
      order.order_price = transactionTotalAmount;
      order.order_date = orderDate;
      order.carry_over =
        customer.balance + updatedTransactionTotalAmount - +amountPaid;
      customer.balance =
        customer.balance + updatedTransactionTotalAmount - +amountPaid;
    });
    setItemsAdded([]);
    hideConfirmTransaction();
    handleTransactionCloseModal();
  };

  useEffect(() => {
    if (type !== "EDIT") return;
    const newItems = order.items.map((item: ItemInBeFormat) => item);
    setItemsAdded(itemsToFeFormat(newItems));
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
              <DatePicker date={orderDate} setDate={setOrderDate} />
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
          updatedTransactionTotalAmount={updatedTransactionTotalAmount}
          orderDate={orderDate}
          previousBalance={customer.balance}
          newBalance={newBalance}
          customer={customer!}
          onConfirmTransaction={
            type === "ADD"
              ? handleConfirmNewTransaction
              : handleConfirmExistingTransaction
          }
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
