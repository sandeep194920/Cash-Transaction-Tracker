import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import React from 'react'
// import { useGlobalContext } from '../utils/AppContext'
import { colors, dimensions, styleUtils, userFormStyles } from '../utils/styles'
// import EditableViewWrapper from './EditableViews/EditableViewWrapper'
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import EditableViewWrapper from './EditableViews/EditableViewWrapper'
import { useGlobalContext } from '../utils/AppContext'
import WithCancelButton from './Buttons/WithCancelButton'
import { useAuth } from '@realm/react'
import { Link } from 'expo-router'
import Colors from '../constants/Colors'
// import { useRealmContext } from '../utils/RealmContext'

const Authenticate = () => {
  const { showLoginPage, handleAuthSwitch } = useGlobalContext()

  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      {/* REGISTER OR LOGIN FORM */}
      <RegisterLoginForm />
    </SafeAreaView>
  )
}

const RegisterLoginForm = () => {
  const { formikAuthenticate } = useGlobalContext()
  const { logInWithEmailPassword } = useAuth()
  const { showLoginPage, handleAuthSwitch } = useGlobalContext()

  const handleSignup = () => {
    logInWithEmailPassword({
      email: 'sandeepmscanada@gmail.com',
      password: 'Mongodb@123',
    })
  }

  return (
    <>
      {/* Page Header */}
      <View style={styleUtils.headerTextContainer}>
        <Text style={styleUtils.headerText}>
          {showLoginPage ? 'Login to your account' : 'Create an account'}
        </Text>
      </View>

      {/* Form */}
      <View style={userFormStyles.flexContainer}>
        {/* Email */}
        <View style={userFormStyles.flexItem}>
          <MaterialIcons name="email" size={21} color={colors.darkGray1} />
          <TextInput
            onChangeText={formikAuthenticate.handleChange('email')}
            onBlur={formikAuthenticate.handleBlur('email')}
            value={formikAuthenticate.values.email}
            style={userFormStyles.textInput}
            placeholder="Email"
            autoCapitalize="none"
          />
        </View>
        {/* Display validation errors if touched */}
        <Text style={userFormStyles.error}>
          {formikAuthenticate.touched.email && formikAuthenticate.errors.email}
        </Text>

        {/* Password */}
        <View style={userFormStyles.flexItem}>
          <MaterialIcons name="lock" size={21} color={colors.darkGray1} />
          <TextInput
            onChangeText={formikAuthenticate.handleChange('password')}
            onBlur={formikAuthenticate.handleBlur('password')}
            value={formikAuthenticate.values.password}
            style={userFormStyles.textInput}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
          />
        </View>
        {/* Display validation errors if touched */}
        <Text style={userFormStyles.error}>
          {formikAuthenticate.touched.password &&
            formikAuthenticate.errors.password}
        </Text>
        <View style={styleUtils.buttonContainer}>
          <Pressable onPress={handleSignup} style={styles.authBtn}>
            <Text style={styles.authBtnText}>
              {showLoginPage ? 'SIGN IN' : 'SIGN UP'}
            </Text>
          </Pressable>
        </View>
        <View style={userFormStyles.flexContainer}>
          <Text>
            {showLoginPage
              ? `You don't have an account?`
              : 'Already have an account?'}
          </Text>
          <Pressable onPress={handleAuthSwitch} style={styles.link}>
            <Text style={styles.linkText}>
              {showLoginPage ? 'SIGN UP' : 'SIGN IN'}
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  )
}

export default Authenticate

const styles = StyleSheet.create({
  authBtn: {
    backgroundColor: colors.lightGreen2,
    padding: dimensions.paddingSmall3,
    display: 'flex',
    flexGrow: 1,
    borderRadius: dimensions.borderRadius,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: dimensions.marginMedium,
  },
  authBtnText: {
    color: 'white',
  },
  link: {
    marginVertical: dimensions.marginMedium,
  },
  linkText: {
    color: colors.lightGreen2,
  },
})
