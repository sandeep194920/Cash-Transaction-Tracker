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
      </SafeAreaView>
    </Modal>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({});



