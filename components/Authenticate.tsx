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
// import { useRealmContext } from '../utils/RealmContext'

const Authenticate = () => {
  // const { formik } = useGlobalContext()

  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      {/* REGISTER OR LOGIN FORM */}
      <RegisterForm />
    </SafeAreaView>
  )
}

const RegisterForm = () => {
  const { formikAuthenticate } = useGlobalContext()
  const { logInWithEmailPassword } = useAuth()

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
        <Text style={styleUtils.headerText}>Create an account</Text>
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
            <Text style={styles.authBtnText}>SIGN IN</Text>
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
})
