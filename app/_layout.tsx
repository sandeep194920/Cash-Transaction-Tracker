import { Stack } from 'expo-router/stack'
import AppContext from '../utils/AppContext'

export default function Layout() {
  return (
    <AppContext>
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
        <Stack.Screen
          name="customers/orders/[order_id]"
          options={{
            headerTitle: 'Details',
            headerStyle: {
              backgroundColor: '#191d1d',
            },
            headerTintColor: 'white',
          }}
        />
      </Stack>
    </AppContext>
  )
}
