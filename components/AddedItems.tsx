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
}

const AddedItems = ({ addItemsShown, itemsAdded }: AddItemsProp) => {
  const windowHeight = Dimensions.get("window").height;

  if (itemsAdded.length === 0) {
    return;
  }

  return (
    <View
      style={{
        height: addItemsShown ? windowHeight / 2 - 50 : windowHeight - 250,
      }}
    >
      <View style={styles.headerTextContainer}>
        <Text style={styleUtils.headerText}>Items Added</Text>
      </View>
      {/* Individual Item card */}
      <FlatList
        contentContainerStyle={styles.itemsContainer}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={itemsAdded}
        renderItem={({ item }) => {
          const { itemName, price, qty, total } = item;
          return (
            <View style={styles.itemContainer}>
              <View
                style={{
                  ...styles.itemRowContainer,
                  alignItems: "center",
                  marginBottom: dimensions.marginLarge1,
                }}
              >
                <Text style={styleUtils.mediumText}>{itemName}</Text>
              </View>

              <View style={styles.itemRowContainer}>
                <Text>Price</Text>
                <Text>${price}</Text>
              </View>

              <View style={styles.itemRowContainer}>
                <Text>Qty</Text>
                <Text>{qty}</Text>
              </View>

              <View style={styles.itemRowContainer}>
                <Text>Total</Text>
                <TextHighlight innerText={`$ ${total}`} type="info" />
              </View>

              <View
                style={{
                  ...styles.itemRowContainer,
                  marginTop: dimensions.marginLarge1,
                }}
              >
                <Feather name="trash-2" size={20} color={colors.red} />
                <Feather name="edit" size={20} color={colors.black} />
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
    // ...styleUtils.itemRowContainer,
    gap: dimensions.largeGap,
    marginHorizontal: dimensions.marginLarge1,
  },
  itemContainer: {
    ...styleUtils.cardContainer,
    padding: 10,
    minWidth: 150,
  },
  itemRowContainer: {
    ...styleUtils.itemRowContainer,
    marginBottom: dimensions.marginMedium,
  },
  headerTextContainer: {
    ...styleUtils.headerTextContainer,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    marginVertical: dimensions.marginMedium,
  },
});
