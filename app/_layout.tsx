import { Stack } from 'expo-router/stack'
import AppContext from '../utils/AppContext'
import { RealmProvider, AppProvider, UserProvider } from '@realm/react'
import { Customer } from '../data/CustomerSchema'
import Login from '../components/Login'

export default function Layout() {
  return (
    <AppProvider id={'devicesync-xogdi'}>
      <UserProvider fallback={<Login />}>
        <RealmProvider
          schema={[Customer as any]}
          // deleteRealmIfMigrationNeeded // for local development when below sync is not used
          sync={{
            flexible: true,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects(Customer))
              },
            },
          }}
        >
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
      </UserProvider>
    </AppProvider>
  )
}
