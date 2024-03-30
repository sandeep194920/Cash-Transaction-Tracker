import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
// import { useGlobalContext } from '../utils/AppContext'
import { colors, dimensions, styleUtils, userFormStyles } from '../utils/styles'
// import EditableViewWrapper from './EditableViews/EditableViewWrapper'
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import EditableViewWrapper from './EditableViews/EditableViewWrapper'
import { useGlobalContext } from '../utils/AppContext'
import WithCancelButton from './Buttons/WithCancelButton'

import {
  AuthOperationName,
  useAuth,
  useEmailPasswordAuth,
  useUser,
} from '@realm/react'
import { Link } from 'expo-router'
import Colors from '../constants/Colors'
import { Credentials } from 'realm'
// import { useRealmContext } from '../utils/RealmContext'

const Authenticate = () => {
  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      {/* REGISTER OR LOGIN FORM */}
      <RegisterLoginForm />
    </SafeAreaView>
  )
}

const RegisterLoginForm = () => {
  const { formikAuthenticate, creds, setCreds } = useGlobalContext()
  const { logInWithEmailPassword } = useAuth()
  const { showLoginPage, handleAuthSwitch } = useGlobalContext()
  const { register, result, logIn } = useEmailPasswordAuth()
  // const user = useUser()
  // const [userIdentities, setUserIdentities] = useState(user.identities)

  const handleSignin = () => {
    // logInWithEmailPassword({
    //   email: 'sandeepmscanada@gmail.com',
    //   password: 'Mongodb@123',
    // })
  }

  // Use `result` to react to successful registration
  // by linking credentials with the current user.

  const registerAndLinkIdentities = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    console.log('The email is', email, 'and pass is', password)
    register({ email, password })
  }

  // Log in the user after successful registration
  useEffect(() => {
    if (
      result.success &&
      result.operation === AuthOperationName.Register &&
      creds.email &&
      creds.password
    ) {
      console.log('The logged in user is', creds.email, creds.password)
      logIn({ email: creds.email, password: creds.password })
    }
  }, [result, logIn])

  useEffect(() => {
    setCreds({
      email: formikAuthenticate.values.email,
      password: formikAuthenticate.values.password,
    })
  }, [formikAuthenticate.values.email, formikAuthenticate.values.password])
  console.log('The email now is', creds.email, 'the pass is', creds.password)
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
          <Pressable
            onPress={
              showLoginPage
                ? () =>
                    logInWithEmailPassword({
                      email: formikAuthenticate.values.email!,
                      password: formikAuthenticate.values.password!,
                    })
                : () =>
                    registerAndLinkIdentities({
                      email: formikAuthenticate.values.email!,
                      password: formikAuthenticate.values.password!,
                    })
            }
            style={styles.authBtn}
          >
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
