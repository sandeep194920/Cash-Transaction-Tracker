import { Modal, SafeAreaView, StyleSheet, View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { useGlobalContext } from "../../utils/AppContext";
import { colors, dimensions, styleUtils } from "../../utils/styles";
import MultipleButtons from "../../components/Buttons/MultipleButtons";
import { ItemAdded } from "../../utils/types";
import AddedItems from "../../components/AddedItems";
import AddTransactionInput from "../../components/AddTransactionInput";
import DatePicker from "../../components/DatePicker";
import { useRealm, useUser } from "@realm/react";
import TextHighlight from "../../components/TextHighlight";

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
    console.log("The items are");
    console.log("The date is", date);
    console.log("The items are", itemsAdded);

    // const transformedItems = itemsAdded.map(item => {
    //   return {
    //     name:item.itemName,
    //     quantity:item.qty,
    //     price_per_item:item.price
    //   }
    // })

    // realm.write(() => {
    //   realm.create("Order", {
    //     _id: new Realm.BSON.ObjectId(),
    //     user_id: user.id,
    //     order_price: transactionTotalAmount,
    //     paid_by_customer: 101,
    //     customer_id: '664b2eefefe2d173655afce1',
    //     carry_over: -101,
    //     order_date: new Date(),
    //     items: transformedItems,
    //   });
    // });
  };

  return (
    <Modal visible={isAddTransactionModalOpen} animationType="slide">
      <SafeAreaView
        style={{
          ...styleUtils.flexContainer,
        }}
      >
        <View style={{ ...styleUtils.flexContainer }}>
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
          <View style={{ backgroundColor: colors.lightGray0 }}>
            {itemsAdded.length > 0 && !showAddItemInput && (
              <>
                <View
                  style={{
                    marginHorizontal: dimensions.marginLarge1,
                    gap: 5,
                  }}
                >
                  <View style={styleUtils.itemRowContainer}>
                    <Text style={{ fontSize: dimensions.smallFont2 }}>
                      Paid by customer
                    </Text>
                    <TextHighlight innerText="$100" type="success" />
                  </View>
                  <View style={styleUtils.itemRowContainer}>
                    <Text style={{ fontSize: dimensions.smallFont2 }}>
                      Carryover
                    </Text>
                    <TextHighlight innerText="$100" type="info" />
                  </View>

                  <View
                    style={{
                      borderBottomColor: colors.lightGray0,
                      borderWidth: 1,
                    }}
                  ></View>
                  <View style={styleUtils.itemRowContainer}>
                    <Text style={{ fontSize: dimensions.largeFont }}>
                      Total Amount
                    </Text>
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
                        title: "Confirm Transaction",
                        bgColor: "lightGreen1",
                        onPress: handleItemsConfirm,
                      },
                    ]}
                  />
                </View>
              </>
            )}
          </View>
        </View>
        {/* <View style={{ backgroundColor: "orange" }}>
          {itemsAdded.length > 0 && !showAddItemInput && (
            <>
              <View
                style={{
                  marginHorizontal: dimensions.marginLarge1,
                  gap: 10,
                }}
              >
                <View style={styleUtils.itemRowContainer}>
                  <Text style={{ fontSize: dimensions.smallFont2 }}>
                    Paid by customer
                  </Text>
                  <TextHighlight innerText="$100" type="success" />
                </View>
                <View style={styleUtils.itemRowContainer}>
                  <Text style={{ fontSize: dimensions.smallFont2 }}>
                    Carryover
                  </Text>
                  <TextHighlight innerText="$100" type="info" />
                </View>

                <View
                  style={{
                    borderBottomColor: colors.lightGray0,
                    borderWidth: 1,
                  }}
                ></View>
                <View style={styleUtils.itemRowContainer}>
                  <Text style={{ fontSize: dimensions.largeFont }}>
                    Total Amount
                  </Text>
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
                      title: "Confirm Transaction",
                      bgColor: "lightGreen1",
                      onPress: handleItemsConfirm,
                    },
                  ]}
                />
              </View>
            </>
          )}
        </View> */}
      </SafeAreaView>
    </Modal>
  );
};

export default AddNewTransaction;

const styles = StyleSheet.create({});
