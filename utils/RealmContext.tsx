import React, { createContext, useContext, useRef, useState } from "react";
import { CustomerType } from "./types";
import { useQuery, useRealm, useUser } from "@realm/react";
import Realm from "realm";
import { Order } from "../models/OrderSchema";

type RealmContextT = {
  addNewCustomerHandler: (customerData: CustomerType) => void;
  addNewTransactionHandler:(transaction:any) => void;
};

const RealmCtxProvider = createContext<RealmContextT | undefined>(undefined);

function RealmContext({ children }: { children: React.ReactNode }) {
  const realm = useRealm();
  const user = useUser();

  const orders = useQuery(Order);
  console.log("The orders retreived are", orders);

  const createdCustomerRef = useRef("");

  /*  add new customer */
  const addNewCustomerHandler = async (customerData: CustomerType) => {
    console.log("ENTERED ADD CUST HADNLER");

    const { name, phone, email, address } = customerData;

    if (!name || !phone || !email || !address) return;

    console.log("ADDING CUST TO DB");

    realm.write(() => {
      const createdCustomer = realm.create("Customer", {
        name,
        phone,
        email,
        address,
        signed_up_on: new Date(),
        balance: 0,
        user_id: user.id,
        orders: orders,
        _id: new Realm.BSON.ObjectId(),
      });
      console.log("The created customer is", createdCustomer);
      createdCustomerRef.current = createdCustomer._id.toString();
    });

    // TODO: this is just to test Order and Item creation. It works fine. Remove this later
    // realm.write(() => {
    //   realm.create("Order", {
    //     _id: new Realm.BSON.ObjectId(),
    //     user_id: user.id,
    //     order_price: 20,
    //     paid_by_customer: 10,
    //     customer_id: createdCustomerRef.current,
    //     carry_over: -10,
    //     order_date: new Date(),
    //     items: [
    //       {
    //         name: "Roti",
    //         quantity: 10,
    //         price_per_item: 1,
    //       },
    //     ],
    //   });
    // });
  };

  const addNewTransactionHandler = (transaction:any) => {
    console.log('Adding the transaction to db',transaction);
  }

  const contextValues = {
    addNewCustomerHandler,
    addNewTransactionHandler
  };

  return (
    <RealmCtxProvider.Provider value={contextValues}>
      {children}
    </RealmCtxProvider.Provider>
  );
}

export const useRealmContext = () => {
  const context = useContext(RealmCtxProvider);

  if (context === undefined) {
    throw new Error("useRealmContext must be used within an RealmProvider");
  }
  return context;
};

export default RealmContext;
