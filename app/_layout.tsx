import { Stack } from 'expo-router/stack'
import AppContext from '../utils/AppContext'
import { AppProvider, RealmProvider, UserProvider } from '@realm/react'
// import { Customer } from '../data/CustomerSchema'
import { Customer } from '../models/CustomerSchema'
import { Order } from '../models/OrderSchema'
import { Item } from '../models/ItemSchema'
import Authenticate from '../components/Authenticate'
import RealmContext from '../utils/RealmContext'
// ctt_sync-dqgiscj
export default function Layout() {
  return (
    //  AppContext will not have access to realm
    //
    // ctt_sync-dqgiscj
    <AppContext>
      <AppProvider id={'application-0-kawjqqk'}>
        <UserProvider fallback={<Authenticate />}>
          <RealmProvider
            schema={[Customer, Order, Item]}
            // deleteRealmIfMigrationNeeded={true} // for local development when below sync is not used
            sync={{
              flexible: true,
              onError: (e) => {
                console.log('Error from realm is', e)
              },
              initialSubscriptions: {
                update(subs, realm) {
                  subs.add(realm.objects(Customer))
                  subs.add(realm.objects(Order))
                  subs.add(realm.objects(Item))
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
