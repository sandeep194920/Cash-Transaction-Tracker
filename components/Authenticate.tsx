import {
  GestureResponderEvent,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect } from "react";
import {
  colors,
  dimensions,
  styleUtils,
  userFormStyles,
} from "../utils/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../utils/AppContext";

import { useAuth, useEmailPasswordAuth } from "@realm/react";
import { Formik } from "formik";
import { AuthValidationSchema } from "../utils/FormValidators";
import { useNavigation } from "expo-router";
import { router } from "expo-router";

const Authenticate = () => {
  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      {/* REGISTER OR LOGIN FORM */}
      <RegisterLoginForm />
    </SafeAreaView>
  );
};

const RegisterLoginForm = () => {
  const { formikAuthenticate, creds, setCreds } = useGlobalContext();
  const { logInWithEmailPassword } = useAuth();
  const { showLoginPage, handleAuthSwitch } = useGlobalContext();
  const { register, result, logIn } = useEmailPasswordAuth();

  const { navigate } = useNavigation();

  // const user = useUser()
  // const [userIdentities, setUserIdentities] = useState(user.identities)

  const handleSignin = () => {
    // logInWithEmailPassword({
    //   email: 'sandeepmscanada@gmail.com',
    //   password: 'Mongodb@123',
    // })
  };

  // Use `result` to react to successful registration
  // by linking credentials with the current user.

  const registerAndLinkIdentities = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    register({ email, password });

    if (result.pending) {
      return <Text>LOADING.....</Text>;
    }
    if (result.error) {
      return <Text>Error occurred {result.error.message}</Text>;
    }
    if (result.success) {
      // return logInWithEmailPassword({ email, password });
      console.log("Registered the user", result);
      // logIn({ email, password });
    }
  };

  // useEffect(() => {
  //   if (result.success) {
  //     console.log("Registered the user successfully, now navigating him");

  //     logInWithEmailPassword({ email: "ab@g.com", password: "123456" });
  //   } else if (result.error) {
  //     console.log("Error occurred:", result.error.message);
  //   }
  // }, [result]);

  // Log in the user after successful registration
  // useEffect(() => {
  //   console.log("Reached effect");
  //   console.log("The result is", result);

  //   if (
  //     result.success &&
  //     result.operation === AuthOperationName.Register &&
  //     creds.email &&
  //     creds.password
  //   ) {
  //     console.log("REGISTRATION SUCCESS");

  //     logInWithEmailPassword({ email: creds.email, password: creds.password });
  //   }
  // }, [result, logInWithEmailPassword]);

  // useEffect(() => {
  //   setCreds({
  //     email: formikAuthenticate.values.email,
  //     password: formikAuthenticate.values.password,
  //   });
  // }, [formikAuthenticate.values.email, formikAuthenticate.values.password]);

  const handleAuth = (e: GestureResponderEvent, handleSubmit: () => void) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <>
      {/* Page Header */}
      <View style={styleUtils.headerTextContainer}>
        <Text style={styleUtils.headerText}>
          {showLoginPage ? "Login to your account" : "Create an account"}
        </Text>
      </View>

      {/* Form */}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={AuthValidationSchema}
        // onSubmit={(values) => console.log(values)}
        onSubmit={(values) => {
          // Your form submission logic here
          if (showLoginPage) {
            logInWithEmailPassword({
              email: values.email,
              password: values.password,
            });
          } else {
            registerAndLinkIdentities({
              email: values.email,
              password: values.password,
            });
          }
        }}
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
            <View style={userFormStyles.flexContainer}>
              {/* Email */}
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
              {/* Display validation errors if touched */}
              <Text style={userFormStyles.error}>
                {touched.email && errors.email}
              </Text>

              {/* Password */}
              <View style={userFormStyles.flexItem}>
                <MaterialIcons name="lock" size={21} color={colors.darkGray1} />
                <TextInput
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  style={userFormStyles.textInput}
                  placeholder="Password"
                  autoCapitalize="none"
                  secureTextEntry
                />
              </View>
              {/* Display validation errors if touched */}
              <Text style={userFormStyles.error}>
                {touched.password && errors.password}
              </Text>
              <View style={styleUtils.buttonContainer}>
                <Pressable
                  onPress={(e) => handleAuth(e, handleSubmit)}
                  style={styles.authBtn}
                >
                  <Text style={styles.authBtnText}>
                    {showLoginPage ? "SIGN IN" : "SIGN UP"}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      </Formik>

      <View style={userFormStyles.flexContainer}>
        <Text>
          {showLoginPage
            ? `You don't have an account?`
            : "Already have an account?"}
        </Text>
        <Pressable onPress={handleAuthSwitch} style={styles.link}>
          <Text style={styles.linkText}>
            {showLoginPage ? "SIGN UP" : "SIGN IN"}
          </Text>
        </Pressable>
      </View>

      {/* <View style={userFormStyles.flexContainer}>
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
        <Text style={userFormStyles.error}>
          {formikAuthenticate.touched.email && formikAuthenticate.errors.email}
        </Text>

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

      </View> */}
    </>
  );
};

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
