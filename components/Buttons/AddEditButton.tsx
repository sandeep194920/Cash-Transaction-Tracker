import { View, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { colors, styleUtils } from '../../utils/styles'
import { RoundButtonType } from "../../utils/types";
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useGlobalContext } from '../../utils/AppContext'

const AddEditButton = ({ type, pressHandler }: RoundButtonType) => {
  const RoundButtonTypes = {
    ADD: (
      <Pressable style={{ ...styleUtils.addButton }} onPress={pressHandler}>
        <Ionicons name="add" size={24} color="white" />
      </Pressable>
    ),
    EDIT: (
      <Pressable
        style={{ ...styleUtils.addButton, backgroundColor: colors.lightBlue1 }}
      >
        <Entypo name="edit" size={24} color="white" />
      </Pressable>
    ),
  };
  return (
    <View style={styleUtils.buttonContainer}>{RoundButtonTypes[type]}</View>
  );
};

export default AddEditButton

const styles = StyleSheet.create({})
