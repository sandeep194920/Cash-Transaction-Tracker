import { Stack } from 'expo-router/stack'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Customers',
          headerStyle: {
            backgroundColor: '#030303',
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="customers/[customer_id]"
        options={{
          headerTitle: 'Transactions',
          headerStyle: {
            backgroundColor: '#191d1d',
          },
          headerTintColor: 'white',
        }}
      />
    </Stack>
  )
}
