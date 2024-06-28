import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, dimensions, styleUtils } from "../utils/styles";
import TextHighlight from "./TextHighlight";
import { Feather } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { ItemAdded } from "../utils/types";

const items = [
  { id: "1", header: "Roti, Curry & Rice", price: 20, qty: 10, total: 200 },
  { id: "2", header: "Roti & Curry", price: 10, qty: 20, total: 200 },
  { id: "3", header: "Rice & Curry", price: 5, qty: 10, total: 50 },
  { id: "4", header: "Roti", price: 20, qty: 10, total: 200 },
  { id: "5", header: "Roti", price: 20, qty: 10, total: 200 },
  { id: "6", header: "Roti", price: 20, qty: 10, total: 200 },
  { id: "7", header: "Roti", price: 20, qty: 10, total: 200 },
  { id: "8", header: "Roti", price: 20, qty: 10, total: 200 },
  { id: "9", header: "Roti", price: 20, qty: 10, total: 200 },
];

interface AddItemsProp {
  addItemsShown: boolean;
  itemsAdded: ItemAdded[];
  onDeleteItem: (id: string) => void;
  onEditItem: (id: string) => void;
  totalAmount: number;
}

const AddedItems = ({
  addItemsShown,
  itemsAdded,
  onDeleteItem,
  onEditItem,
  totalAmount,
}: AddItemsProp) => {
  const windowHeight = Dimensions.get("window").height;

  if (itemsAdded.length === 0) {
    return;
  }

  // if items are odd number then that would break the layout of Flatlist columnWrapperStyle.
  // Hence always ensuring that the items are even
  const adjustedItems: ItemAdded[] =
    itemsAdded.length % 2 !== 0
      ? [
          ...itemsAdded,
          {
            id: "placeholder",
            itemName: "placeholder",
            price: -1,
            qty: -1,
            total: -1,
          },
        ]
      : itemsAdded;

  return (
    <View
      style={{
        maxHeight: addItemsShown ? null : windowHeight - 300,
        paddingVertical: 5,
      }}
    >
      <FlatList
        contentContainerStyle={styles.itemsContainer}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-around",
        }}
        style={{ flexGrow: 0 }}
        data={adjustedItems}
        renderItem={({ item }) => {
          if (item.id === "placeholder") {
            return <View style={styles.placeholderContainer} />;
          }

          const { id, itemName, price, qty, total } = item;
          return (
            <View style={styles.itemContainer}>
              <View
                style={{
                  ...styles.itemRowContainer,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: dimensions.smallMargin,
                }}
              >
                <Text style={styles.itemName}>{itemName}</Text>
              </View>

              <View style={styles.itemRowContainer}>
                <Text style={styleUtils.smallText}>Price</Text>
                <Text style={styleUtils.smallText}>${price}</Text>
              </View>

              <View style={styles.itemRowContainer}>
                <Text style={styleUtils.smallText}>Qty</Text>
                <Text style={styleUtils.smallText}>{qty}</Text>
              </View>

              <View style={styles.itemRowContainer}>
                <Text style={styleUtils.smallText}>Total</Text>
                <TextHighlight innerText={`$ ${total}`} type="info" />
              </View>

              <View
                style={{
                  ...styles.itemRowContainer,
                }}
              >
                <Feather
                  name="trash-2"
                  size={15}
                  color={colors.red}
                  onPress={() => onDeleteItem(id)}
                />
                <Feather
                  name="edit"
                  size={15}
                  color={colors.black}
                  onPress={() => onEditItem(id)}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default AddedItems;

const styles = StyleSheet.create({
  itemsContainer: {
    marginHorizontal: dimensions.marginLarge1,
    // backgroundColor: "lightblue",
  },
  itemContainer: {
    ...styleUtils.cardContainer,
    padding: 8,
    minWidth: 160,
  },
  itemRowContainer: {
    ...styleUtils.itemRowContainer,
    marginBottom: dimensions.marginMedium,
  },
  itemName: {
    ...styleUtils.mediumText,
  },
  placeholderContainer: {
    minWidth: 150,
  },
});
