import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import MultipleButtons from "./Buttons/MultipleButtons";
import { colors, dimensions, styleUtils } from "../utils/styles";
import { ButtonType } from "../utils/types";

interface AddTransactionInputProps {
  handleClose: () => void;
  itemNumber: number;
  setItemNumber?: React.Dispatch<React.SetStateAction<number>>;
}

const AddTransactionInput = ({
  handleClose,
  itemNumber,
}: AddTransactionInputProps) => {
  const transactionButtons: ButtonType[] = [
    {
      title: "Go back",
      color: "red",
      bgColor: "transparent",
      onPress: handleClose,
    },
    {
      title: "Add Item",
      bgColor: "lightGreen1",
    },
  ];
  return (
    <View>
      <View style={{ ...styleUtils.cardContainer, width: "90%" }}>
        <Text style={styles.itemHeaderText}>Add Item : {itemNumber + 1}</Text>
        <View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.itemHeading}>Item name</Text>
            <TextInput style={styles.itemInput} />
          </View>

          <View style={styles.itemRowContainer}>
            <Text style={styles.itemHeading}>Price per item</Text>
            <TextInput style={styles.itemInput} />
          </View>

          <View style={styles.itemRowContainer}>
            <Text style={styles.itemHeading}>Quantity</Text>
            <TextInput style={styles.itemInput} />
          </View>

          <View style={styles.itemRowContainer}>
            <View>
              <Text style={styles.itemHeading}>Total price of this item</Text>
              <Text style={styleUtils.subText}>
                (Price per item X Quantity )
              </Text>
            </View>
            <View
              style={{
                ...styleUtils.tag,
                backgroundColor: colors.darkGray1,
              }}
            >
              <Text
                style={{
                  ...styleUtils.tagText,
                  fontSize: dimensions.smallFont1,
                  fontWeight: "600",
                }}
              >
                {200}
              </Text>
            </View>
          </View>
          <MultipleButtons buttons={transactionButtons} />
        </View>
      </View>
    </View>
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
