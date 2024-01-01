import { Stack } from 'expo-router/stack'
import AppContext from '../utils/AppContext'
import { RealmProvider } from '@realm/react'

export default function Layout() {
  return (
    <RealmProvider>
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
    </RealmProvider>
  )
}
