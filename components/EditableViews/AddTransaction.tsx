import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useGlobalContext } from "../../utils/AppContext";
import WithCancelButton from "../Buttons/WithCancelButton";
import { colors, styleUtils, userFormStyles } from "../../utils/styles";
import {
  MaterialIcons,
  Ionicons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import { useRealmContext } from "../../utils/RealmContext";

const AddTransaction = () => {
  // const { formikAddCustomer } = useRealmContext();
  const { isAddTransactionModalOpen, showTransactionModal } =
    useGlobalContext();

  return (
    <Modal visible={isAddTransactionModalOpen} animationType="slide">
      <SafeAreaView style={styleUtils.flexContainer}>
        {/* ADD CUSTOMER FORM---> */}

        {/* Page Header */}
        <View style={styleUtils.headerTextContainer}>
          <Text style={styleUtils.headerText}>Add New Transaction</Text>
        </View>

        {/* Form */}
        <View style={userFormStyles.flexContainer}>
          {/* Name */}
          <View style={userFormStyles.flexItem}>
            <Ionicons name="person" size={24} color={colors.darkGray1} />
            <TextInput
              onChangeText={formikAddCustomer.handleChange("name")}
              onBlur={formikAddCustomer.handleBlur("name")}
              value={formikAddCustomer.values.name}
              style={userFormStyles.textInput}
              placeholder="Name"
            />
          </View>
          <View>
            {/* Display validation errors if touched */}
            <Text style={userFormStyles.error}>
              {formikAddCustomer.touched.name && formikAddCustomer.errors.name}
            </Text>
          </View>
          {/* Phone */}
          <View style={userFormStyles.flexItem}>
            <Entypo name="phone" size={24} color={colors.darkGray1} />
            <TextInput
              // onChangeText={(text) => handleCustomerFormInput(text, 'phone')} // if we dont use formik
              onChangeText={formikAddCustomer.handleChange("phone")}
              onBlur={formikAddCustomer.handleBlur("phone")}
              value={formikAddCustomer.values.phone}
              style={userFormStyles.textInput}
              placeholder="Phone"
            />
          </View>
          {/* Display validation errors if touched */}
          <Text style={userFormStyles.error}>
            {formikAddCustomer.touched.phone && formikAddCustomer.errors.phone}
          </Text>
          {/* Email */}
          <View style={userFormStyles.flexItem}>
            <MaterialIcons name="email" size={21} color={colors.darkGray1} />
            <TextInput
              onChangeText={formikAddCustomer.handleChange("email")}
              onBlur={formikAddCustomer.handleBlur("email")}
              value={formikAddCustomer.values.email}
              style={userFormStyles.textInput}
              placeholder="Email"
              autoCapitalize="none"
            />
          </View>
          {/* Display validation errors if touched */}
          <Text style={userFormStyles.error}>
            {formikAddCustomer.touched.email && formikAddCustomer.errors.email}
          </Text>
          {/* Address */}
          <View style={userFormStyles.flexItem}>
            <FontAwesome
              name="address-card"
              size={24}
              color={colors.darkGray1}
            />
            <TextInput
              onChangeText={formikAddCustomer.handleChange("address")}
              onBlur={formikAddCustomer.handleBlur("address")}
              value={formikAddCustomer.values.address}
              style={userFormStyles.textInput}
              placeholder="Address"
            />
          </View>
          {/* Display validation errors if touched */}
          <Text style={userFormStyles.error}>
            {formikAddCustomer.touched.address &&
              formikAddCustomer.errors.address}
          </Text>
        </View>
        {/* <--- ADD Transaction FORM*/}
        <WithCancelButton
          onPressHandler={() => {}}
          onCancelHandler={() => showTransactionModal(false)}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({});
