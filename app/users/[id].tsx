import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router/src/hooks'

const User = () => {
  const { id } = useLocalSearchParams()
  return (
    <View>
      <Text>User {id}</Text>
    </View>
  )
}

export default User
