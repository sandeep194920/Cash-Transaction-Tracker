import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
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
interface AddTransactionInputProps {
  handleClose: () => void;
  itemNumber: number;
  setItemNumber?: React.Dispatch<React.SetStateAction<number>>;
  onItemAdded: (newItem: ItemAdded) => void;
}

const initialInputValues: Item = {
  itemName: "",
  price: 0,
  qty: 0,
};

const AddTransactionInput = ({
  handleClose,
  itemNumber,
  onItemAdded,
}: AddTransactionInputProps) => {
  const handleItemAddition = (item: Item) => {
    const newItem = {
      ...item,
      id: uuid.v4().toString(),
      total: +(item.price * item.qty).toFixed(2),
    };
    onItemAdded(newItem);
  };

  return (
    <Formik
      initialValues={initialInputValues}
      validationSchema={ItemInputSchema}
      onSubmit={handleItemAddition}
    >
      {({
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        handleSubmit,
      }) => {
        return (
          <View>
            <View style={{ ...styleUtils.cardContainer, width: "90%" }}>
              <Text style={styles.itemHeaderText}>
                Add Item : {itemNumber + 1}
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
                    value={`${values.price}`} // number is converted to str
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
                    value={`${values.qty}`} // number is converted to str
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
                      onPress: handleClose,
                    },
                    {
                      title: "Add Item",
                      bgColor: "lightGreen1",
                      onPress: handleSubmit,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        );
      }}
    </Formik>
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
    padding: dimensions.paddingSmall3,
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

