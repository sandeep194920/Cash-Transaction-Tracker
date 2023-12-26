import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { orders } from '../../../data'
import { colors, dimensions, styleUtils } from '../../../utils/styles'
import Button from '../../../components/Buttons/AddEditButton'

const CustomerOrder = () => {
  const { customer_id, order_id, customer_name } = useLocalSearchParams()

  const order = orders[customer_id as string].find(
    (order) => order.order_id === order_id
  )

  const { order_date, order_price, items, paid_by_customer, carry_over } =
    order ?? {
      order_price: 0,
      paid_by_customer: 0,
      carry_over: 0,
    }
  let type = 'CarryOver'

  if (order_price - paid_by_customer <= 0) {
    type = 'Overpayment'
  }

  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      <View style={styleUtils.flexContainer}>
        {/* Header to show date and price */}
        <View style={styleUtils.headerTextContainer}>
          <Text style={styleUtils.headerText}>{order_date}</Text>
          <Text style={styleUtils.smallText}>(Monday)</Text>
        </View>
        {/* Items */}
        <View style={styles.itemsContainer}>
          <FlatList
            data={items}
            renderItem={({ item }) => <ItemDetails {...item} />}
          />
        </View>

        {/* Customer Price Details */}

        {/* total */}
        <View style={styles.priceContainer}>
          <Text style={styleUtils.mediumText}>Total </Text>
          <View style={styleUtils.flexRow}>
            <View
              style={{
                ...styleUtils.tag,
                backgroundColor: colors.lightBlue1,
              }}
            >
              <Text
                style={{
                  ...styleUtils.tagText,
                  fontSize: dimensions.mediumFont,
                }}
              >{` $ ${order_price} `}</Text>
            </View>
          </View>
        </View>
        {/* paid by customer */}
        <View style={styles.priceContainer}>
          <Text style={styleUtils.mediumText}>{customer_name} paid</Text>
          <View style={styleUtils.flexRow}>
            <View
              style={{
                ...styleUtils.tag,
                backgroundColor: colors.lightGreen1,
              }}
            >
              <Text
                style={{
                  ...styleUtils.tagText,
                  fontSize: dimensions.mediumFont,
                }}
              >{` $ ${paid_by_customer} `}</Text>
            </View>
          </View>
        </View>
        {/* carryover */}
        <View style={styles.priceContainer}>
          <Text style={styleUtils.mediumText}>{type}</Text>
          <View style={styleUtils.flexRow}>
            <View
              style={{
                ...styleUtils.tag,
                backgroundColor:
                  type === 'Overpayment' ? colors.lightGreen2 : colors.red,
              }}
            >
              <Text
                style={{
                  ...styleUtils.tagText,
                  fontSize: dimensions.mediumFont,
                }}
              >{` $ ${carry_over} `}</Text>
            </View>
          </View>
        </View>
      </View>
      <Button type="EDIT" />
    </SafeAreaView>
  )
}

export default CustomerOrder

type ItemDetails = {
  name: string
  pricePerItem: number
  quantity: number
}

const ItemDetails = (props: ItemDetails) => {
  const { name, pricePerItem, quantity } = props
  return (
    <View style={styles.itemContainerExtended}>
      <Text style={styleUtils.largeText}>
        {name[0].toUpperCase()}
        {name.slice(1)}
        <Text style={styleUtils.subText}> (× {quantity})</Text>
      </Text>
      <View style={styleUtils.flexRow}>
        <View
          style={{
            ...styleUtils.tag,
          }}
        >
          <Text style={{ ...styleUtils.tagText, color: colors.black }}>{` $ ${
            pricePerItem * quantity
          } `}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemsContainer: {
    backgroundColor: colors.lightGray1,
    marginBottom: dimensions.marginLarge,
  },
  itemContainerExtended: {
    ...styleUtils.itemContainer,
    marginBottom: dimensions.noMargin,
  },
  priceContainer: {
    ...styleUtils.itemContainer,
    backgroundColor: 'transparent',
    marginBottom: dimensions.noMargin,
  },
})
