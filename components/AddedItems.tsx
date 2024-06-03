import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { styleUtils } from "../utils/styles";

const AddedItems = () => {
  return (
    <View>
      <View
        style={{
          ...styleUtils.headerTextContainer,
          justifyContent: "flex-start",
          paddingHorizontal: 20,
        }}
      >
        <Text style={styleUtils.headerText}>Items Added</Text>
      </View>

      {/* Individual Item card */}
      <View
        style={{
          //   backgroundColor: "orange",
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 10,
          paddingHorizontal: 10,
          flexWrap: "wrap",
        }}
      >
        <View
          style={{
            ...styleUtils.cardContainer,
            padding: 10,
            flexDirection: "row",
            // alignSelf: "flex-start",
          }}
        >
          <View style={{ rowGap: 12, width: 150 }}>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text style={styleUtils.mediumText}>Roti, Curry and Rice</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>Price</Text>
              <Text>20</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>Qty</Text>
              <Text>20</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>Total</Text>
              <Text>200</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            ...styleUtils.cardContainer,
            padding: 10,
            flexDirection: "row",
            // alignSelf: "flex-start",
          }}
        >
          <View style={{ rowGap: 12, width: 150 }}>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text style={styleUtils.mediumText}>Roti</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>Price</Text>
              <Text>20</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>Qty</Text>
              <Text>20</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>Total</Text>
              <Text>200</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            ...styleUtils.cardContainer,
            padding: 10,
            flexDirection: "row",
            // alignSelf: "flex-start",
          }}
        >
          <View style={{ rowGap: 12, width: 150 }}>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text style={styleUtils.mediumText}>Roti</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>Price</Text>
              <Text>20</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>Qty</Text>
              <Text>20</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>Total</Text>
              <Text>200</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddedItems;

const styles = StyleSheet.create({
  addedItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
