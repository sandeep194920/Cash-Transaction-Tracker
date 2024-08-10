import { Stack } from "expo-router/stack";
import AppContext from "../utils/AppContext";
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { Customer } from "../models/CustomerSchema";
import { Order, Item, BalanceUpdate } from "../models/OrderSchema";
import Authenticate from "../screens/Authenticate";
import RealmContext from "../utils/RealmContext";
import { AppConstants } from "../constants";
import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

export default function Layout() {
  return (
    //  AppContext will not have access to realm
    <AppContext>
      <AppProvider id={AppConstants.APP_ID}>
        <UserProvider fallback={<Authenticate />}>
          <RealmProvider
            schema={[Customer, Order, Item, BalanceUpdate]} // Item is required here even though it is embedded
            // deleteRealmIfMigrationNeeded={true} // for local development when below sync is not used
            sync={{
              flexible: true,
              onError: (e) => {
                console.log("Error from realm is", e);
              },

              initialSubscriptions: {
                update(subs, realm) {
                  subs.add(realm.objects(Customer));
                  subs.add(realm.objects(Order));
                  // subs.add(realm.objects(Item)) // this is not necessary as it is embedded collection, but make sure you add it in schema above
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
                    headerTitle: "Customers",
                    headerStyle: {
                      backgroundColor: "#030303",
                    },
                    headerTintColor: "white",
                  }}
                />
                <Stack.Screen
                  name="customers/[customer_id]"
                  options={{
                    headerTitle: "Transactions",
                    headerStyle: {
                      backgroundColor: "#191d1d",
                    },
                    headerTintColor: "white",
                  }}
                />
                <Stack.Screen
                  name="customers/orders/[order_id]"
                  options={{
                    headerTitle: "Details",
                    headerStyle: {
                      backgroundColor: "#191d1d",
                    },
                    headerTintColor: "white",
                  }}
                />
              </Stack>
            </RealmContext>
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </AppContext>
  );
}
