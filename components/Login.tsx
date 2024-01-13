import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '@realm/react'

const Login = () => {
  // `logInWithAnonymous` logs in a user using an
  // anonymous Realm Credential.
  // `result` gives us access to the result of the
  // current operation. In this case, `logInWithAnonymous`.
  const { logInWithAnonymous, result } = useAuth()
  // Log in an anyonmous user on component render.
  // On successful login, this fallback component unmounts.
  useEffect(() => {
    logInWithAnonymous()
    console.log('The error is', result.error)
  }, [])
  return (
    <View>
      {!result.error && <Text>Please log in</Text>}
      <View>
        {result.pending && <ActivityIndicator />}
        {result.error && <Text>Error here in login component</Text>}
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})
