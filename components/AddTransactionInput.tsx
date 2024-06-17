import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import MultipleButtons from "./Buttons/MultipleButtons";
import {
  colors,
  dimensions,
  styleUtils,
  userFormStyles,
} from "../utils/styles";
import { ItemAdded, Item } from "../utils/types";
import { Formik } from "formik";
import { ItemInputSchema } from "../utils/FormValidators";
import uuid from "react-native-uuid";
import TextHighlight from "./TextHighlight";

// * NOTE ABOUT THIS COMPONENT

/*
We are handling two things here.
1. To handle adding new item 
2. To handle updating items - When user clicks on edit icon in item card inside <AddedItems/> component,
   then we need to show this input with those filled values and then update them

For this reason we have the logic handleItemAddition() for adding an item, and handleItemUpdate() for updating an item

*/

interface AddTransactionInputProps {
  handleClose: () => void;
  itemNumber: number;
  setItemNumber?: React.Dispatch<React.SetStateAction<number>>;
  onItemAdded: (newItem: ItemAdded) => void;
  itemCurrentlyEditted: ItemAdded | null;
  onItemUpdate: (item: ItemAdded) => void;
}

const initFormValues: Item = {
  itemName: "",
  price: 0,
  qty: 0,
};
let initialInputValues = initFormValues;

const AddTransactionInput = ({
  handleClose,
  itemNumber,
  onItemAdded,
  itemCurrentlyEditted,
  onItemUpdate,
}: AddTransactionInputProps) => {
  const handleItemAddition = (item: Item) => {
    const newItem = {
      ...item,
      id: uuid.v4().toString(),
      total: +(item.price * item.qty).toFixed(2),
    };
    onItemAdded(newItem);
  };

  const handleItemUpdate = (item: Item) => {
    if (!itemCurrentlyEditted) return;

    const updatedItem = {
      ...item,
      id: itemCurrentlyEditted.id,
      total: +(item.price * item.qty).toFixed(2),
    };
    onItemUpdate(updatedItem);
    initialInputValues = initFormValues;
  };

  const handleCancel = () => {
    handleClose();
    initialInputValues = initFormValues;
  };

  if (itemCurrentlyEditted?.itemName) {
    const { itemName, price, qty } = itemCurrentlyEditted;
    initialInputValues = {
      itemName,
      price,
      qty,
    };
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialInputValues}
      validationSchema={ItemInputSchema}
      onSubmit={!!itemCurrentlyEditted ? handleItemUpdate : handleItemAddition}
    >
      {({
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        handleSubmit,
        // resetForm, // TODO: this didnt help me in clearing the values. Will come back to this if I have time
      }) => {
        return (
          <View>
            <View style={{ ...styleUtils.cardContainer, width: "90%" }}>
              <Text style={styles.itemHeaderText}>
                {itemCurrentlyEditted
                  ? `Edit Item`
                  : `Add Item : ${itemNumber + 1}`}
              </Text>
              <View>
                <View style={styles.itemRowContainer}>
                  <Text style={styles.itemHeading}>Item name</Text>
                  <TextInput
                    onBlur={handleBlur("itemName")}
                    onChangeText={handleChange("itemName")}
                    value={values.itemName}
                    style={styles.itemInput}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      ...userFormStyles.error,
                      alignSelf: "center",
                    }}
                  >
                    {touched.itemName && errors.itemName}
                  </Text>
                </View>

                <View style={styles.itemRowContainer}>
                  <Text style={styles.itemHeading}>Price per item</Text>
                  <TextInput
                    onBlur={handleBlur("price")}
                    onChangeText={handleChange("price")}
                    value={`${values.price === 0 ? " " : values.price}`}
                    style={styles.itemInput}
                    keyboardType="numeric"
                    placeholder="Price of this item"
                  />
                </View>

                <View>
                  <Text
                    style={{
                      ...userFormStyles.error,
                      alignSelf: "center",
                    }}
                  >
                    {touched.price && errors.price}
                  </Text>
                </View>

                <View style={styles.itemRowContainer}>
                  <Text style={styles.itemHeading}>Quantity</Text>
                  <TextInput
                    onBlur={handleBlur("qty")}
                    onChangeText={handleChange("qty")}
                    value={`${values.qty === 0 ? " " : values.qty}`}
                    style={styles.itemInput}
                    keyboardType="numeric"
                    placeholder="How many of these"
                  />
                </View>
                <View>
                  <Text
                    style={{
                      ...userFormStyles.error,
                      alignSelf: "center",
                    }}
                  >
                    {touched.qty && errors.qty}
                  </Text>
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

                  <TextHighlight
                    innerText={`$ ${(values.price * values.qty).toFixed(2)}`}
                    type="info"
                  />
                </View>
                <MultipleButtons
                  buttons={[
                    {
                      title: "Cancel",
                      color: "red",
                      bgColor: "transparent",
                      onPress: handleCancel,
                    },
                    {
                      ...(!!itemCurrentlyEditted
                        ? {
                            title: "Update Item",
                            bgColor: "lightBlue1",
                            onPress: handleSubmit,
                          }
                        : {
                            title: "Add Item",
                            bgColor: "lightGreen1",
                            onPress: handleSubmit,
                          }),
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        );
      }}
    </Formik>
    // <>
    //   <TextInput value={values.itemName}>{values.itemName}</TextInput>
    //   <MultipleButtons
    //     buttons={[
    //       {
    //         title: "Cancel",
    //         color: "red",
    //         bgColor: "transparent",
    //         onPress: handleClose,
    //       },
    //       {
    //         ...(!!itemCurrentlyEditted
    //           ? {
    //               title: "Update Item",
    //               bgColor: "lightBlue1",
    //               onPress: () => handleItemUpdate(itemCurrentlyEditted),
    //             }
    //           : {
    //               title: "Add Item",
    //               bgColor: "lightGreen1",
    //               onPress: () =>
    //                 handleItemAddition({
    //                   itemName: "NEW ITEM",
    //                   price: 0,
    //                   qty: 0,
    //                 }),
    //             }),
    //       },
    //     ]}
    //   />
    // </>
  );
};

export default AddTransactionInput;

const styles = StyleSheet.create({
  itemHeaderText: {
    fontSize: dimensions.largeFont,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  itemRowContainer: {
    ...styleUtils.itemRowContainer,
    padding: dimensions.paddingSmall1,
  },
  itemHeading: {
    fontWeight: "600",
    fontSize: dimensions.mediumFont,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  itemInput: {
    borderColor: colors.lightGreen1,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 160,
  },
});
