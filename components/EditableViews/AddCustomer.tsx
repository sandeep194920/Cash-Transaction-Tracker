import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
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
import { Formik } from "formik";
import { customerValidationSchema } from "../../utils/FormValidators";
import { CustomerType } from "../../utils/types";

const customerInitialValues = { name: "", phone: "", email: "", address: "" };
const AddCustomer = () => {
  const { isAddCustomerModalOpen, showCustomerModal } = useGlobalContext();
  const { addNewCustomerHandler } = useRealmContext();

  const addCustomerHandler = (customerData: CustomerType) => {
    addNewCustomerHandler(customerData);
    showCustomerModal(false);
  };

  const cancelHandler = () => {
    showCustomerModal(false);
  };

  return (
    <Modal visible={isAddCustomerModalOpen} animationType="slide">
      <SafeAreaView style={styleUtils.flexContainer}>
        {/* ADD CUSTOMER FORM---> */}
        {/* Page Header */}
        <View style={styleUtils.headerTextContainer}>
          <Text style={styleUtils.headerText}>Add New Customer</Text>
        </View>

        {/* Form */}

        <Formik
          initialValues={customerInitialValues}
          validationSchema={customerValidationSchema}
          onSubmit={(values) => addCustomerHandler(values)}
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
              <>
                <View style={userFormStyles.flexContainer}>
                  <View style={userFormStyles.flexItem}>
                    <Ionicons
                      name="person"
                      size={24}
                      color={colors.darkGray1}
                    />

                    <TextInput
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                      style={userFormStyles.textInput}
                      placeholder="Name"
                    />
                  </View>

                  <View>
                    <Text style={userFormStyles.error}>
                      {touched.name && errors.name}
                    </Text>
                  </View>

                  <View style={userFormStyles.flexItem}>
                    <Entypo name="phone" size={24} color={colors.darkGray1} />

                    <TextInput
                      // onChangeText={(text) => handleCustomerFormInput(text, 'phone')} // if we dont use formik

                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      value={values.phone}
                      style={userFormStyles.textInput}
                      placeholder="Phone"
                    />
                  </View>

                  <Text style={userFormStyles.error}>
                    {touched.phone && errors.phone}
                  </Text>

                  <View style={userFormStyles.flexItem}>
                    <MaterialIcons
                      name="email"
                      size={21}
                      color={colors.darkGray1}
                    />

                    <TextInput
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      style={userFormStyles.textInput}
                      placeholder="Email"
                      autoCapitalize="none"
                    />
                  </View>

                  <Text style={userFormStyles.error}>
                    {touched.email && errors.email}
                  </Text>

                  <View style={userFormStyles.flexItem}>
                    <FontAwesome
                      name="address-card"
                      size={24}
                      color={colors.darkGray1}
                    />

                    <TextInput
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      value={values.address}
                      style={userFormStyles.textInput}
                      placeholder="Address"
                    />
                  </View>

                  <Text style={userFormStyles.error}>
                    {touched.address && errors.address}
                  </Text>
                </View>

                <WithCancelButton
                  onPressHandler={handleSubmit}
                  onCancelHandler={cancelHandler}
                />
              </>
            );
          }}
        </Formik>
      </SafeAreaView>
    </Modal>
  );
};

export default AddCustomer;

const styles = StyleSheet.create({});





