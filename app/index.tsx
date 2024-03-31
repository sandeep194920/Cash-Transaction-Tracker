import { FlatList, Pressable, SafeAreaView, View, Text } from 'react-native'
import React from 'react'
import data from '../data'
import Customer from '../components/Customer'
import AddEditButton from '../components/Buttons/AddEditButton'
import AddCustomer from '../components/EditableViews/AddCustomer'
import { useGlobalContext } from '../utils/AppContext'
import { colors, dimensions, styleUtils } from '../utils/styles'
import { StyleSheet } from 'react-native'
import { useAuth, useUser } from '@realm/react'

const Customers = () => {
  const { customers } = data
  const { inputView } = useGlobalContext()
  const { logOut } = useAuth()

  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => logOut()}>
          <Text style={styles.buttonText}>Sign out</Text>
        </Pressable>
      </View>
      {!inputView.isInput && (
        <>
          <FlatList
            data={customers}
            renderItem={({ item }) => <Customer {...item} />}
          />

          <AddEditButton type="ADD" />
        </>
      )}
      {inputView.isInput && inputView.inputType === 'ADD' && <AddCustomer />}
    </SafeAreaView>
  )
}

export default Customers

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
  },
  buttonText: {
    color: colors.white,
    backgroundColor: colors.red,
    padding: dimensions.paddingSmall2,
    paddingHorizontal: dimensions.paddingSmall3,
    borderRadius: dimensions.borderRadius,
  },
})
