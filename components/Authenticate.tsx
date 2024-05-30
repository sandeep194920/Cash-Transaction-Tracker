import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  dimensions,
  styleUtils,
  userFormStyles,
} from "../utils/styles";
import { MaterialIcons } from "@expo/vector-icons";

import { AuthOperationName, useAuth, useEmailPasswordAuth } from "@realm/react";
import { Formik, useFormikContext, Form } from "formik";
import { AuthValidationSchema } from "../utils/FormValidators";

interface AuthFormProps {
  email: string;
  password: string;
}

const Authenticate = () => {
  return (
    <SafeAreaView style={styleUtils.flexContainer}>
      <RegisterLoginForm />
    </SafeAreaView>
  );
};

export default Authenticate;

const RegisterLoginForm = () => {
  const [showLoginPage, setShowLoginPage] = useState(true);
  const { logInWithEmailPassword } = useAuth();
  const { register, result, logIn } = useEmailPasswordAuth();

  const performRegistration = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    register({ email, password });
  };

  // *? Earlier we had the below code, but there was no easy way
  // *? (without using useState or useRef) to get access to
  // *? values like email and password. So I followed https://formik.org/docs/api/useFormikContext
  // *? formik docs and wrote AuthFormValues as suggested to use useFormikContext to
  // *? get access to values

  /* 
    Log in the user after successful registration

     useEffect(() => {
       if (result.success && result.operation === AuthOperationName.Register) {
         logIn({ email: "plm@g.com", password: "123456" });
       }
     }, [result, logIn]); 
  */

  const handleAuthSwitch = () => {
    setShowLoginPage((pre) => !pre);
  };

  // *? As mentioned above, writing this in component style so that
  // *? I can use this in jsx below.
  // *? This pattern is recommended by Formik inorder to use useFormikContext
  // *? Reference - https://formik.org/docs/api/useFormikContext

  const AuthFormValues = () => {
    const { values } = useFormikContext<AuthFormProps>();

    // Log in the user after successful registration
    useEffect(() => {
      if (result.success && result.operation === AuthOperationName.Register) {
        logIn({ email: values.email, password: values.password });
      }
    }, [result, logIn, values]);

    return null;
  };

  return (
    <>
      <View style={styleUtils.headerTextContainer}>
        <Text style={styleUtils.headerText}>
          {showLoginPage ? "Login to your account" : "Create an account"}
        </Text>
      </View>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={AuthValidationSchema}
        onSubmit={(values: AuthFormProps) => {
          // Your form submission logic here
          if (showLoginPage) {
            logInWithEmailPassword({
              email: values.email,
              password: values.password,
            });
          } else {
            performRegistration({
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
            <>
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
                  <MaterialIcons
                    name="lock"
                    size={21}
                    color={colors.darkGray1}
                  />
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
                    // onPress={(e) => handleAuth(e, handleSubmit)}
                    onPress={() => handleSubmit()}
                    style={styles.authBtn}
                  >
                    <Text style={styles.authBtnText}>
                      {showLoginPage ? "SIGN IN" : "SIGN UP"}
                    </Text>
                  </Pressable>
                </View>
              </View>
              <AuthFormValues />
            </>
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
    </>
  );
};

const styles = StyleSheet.create({
  authBtn: {
    backgroundColor: colors.lightGreen2,
    padding: dimensions.paddingSmall3,
    display: "flex",
    flexGrow: 1,
    borderRadius: dimensions.borderRadius,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: dimensions.marginMedium,
  },
  authBtnText: {
    color: "white",
  },
  link: {
    marginVertical: dimensions.marginMedium,
  },
  linkText: {
    color: colors.lightGreen2,
  },
});
