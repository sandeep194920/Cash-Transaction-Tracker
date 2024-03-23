import { Stack } from 'expo-router/stack'
import AppContext from '../utils/AppContext'
import { RealmProvider, AppProvider, UserProvider } from '@realm/react'
import { Customer } from '../data/CustomerSchema'
import Authenticate from '../components/Authenticate'
import { View } from 'react-native'
import RealmContext from '../utils/RealmContext'

export default function Layout() {
  return (
    //  AppContext will not have access to realm
    <AppContext>
      <AppProvider id={'devicesync-xogdi'}>
        <UserProvider fallback={<Authenticate />}>
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
            {/* RealmContext will have access to realm */}
            <RealmContext>
              <Stack
              // screenOptions={{
              //   contentStyle: { backgroundColor: 'black' },
              // }}
              >
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
            </RealmContext>
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </AppContext>
  )
}
