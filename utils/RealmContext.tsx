import { FormikConfig, useFormik } from 'formik'
import React, { createContext, useContext, useRef, useState } from "react";
import { customerValidationSchema } from "./FormValidators";
import { CustomerType, InputViewType } from "./types";
import { useQuery, useRealm, useUser } from "@realm/react";
import Realm from "realm";
import { Order } from "../models/OrderSchema";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  address: string;
  password: string;
};

type RealmContextT = {
  formikAuthenticate: ReturnType<typeof useFormik<Partial<FormValues>>>;
  addNewCustomerHandler: (customerData: CustomerType) => void;
};

const RealmCtxProvider = createContext<RealmContextT | undefined>(undefined);

function RealmContext({ children }: { children: React.ReactNode }) {
  const [inputView, setInputView] = useState<InputViewType>({
    isInput: false,
    inputType: null,
  });

  const realm = useRealm();
  const user = useUser();

  // Formik to add customer form
  const formikConfigAddCustomer: FormikConfig<Partial<FormValues>> = {
    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
    validationSchema: customerValidationSchema,
    onSubmit: () => {
      console.log("GEEER");
    },
  };

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

  // Formik for Authenticate form
  const formikConfigAuthenticate: FormikConfig<Partial<FormValues>> = {
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: customerValidationSchema,
    onSubmit: () => {
      // Handle form submission here (e.g., call addNewCustomerHandler)
      // addNewCustomerHandler;
    },
  };

  const formikAuthenticate = useFormik(formikConfigAuthenticate);

  const contextValues = {
    inputView,
    // formikAddCustomer,
    formikAuthenticate,
    addNewCustomerHandler,
  };

  return (
    <RealmCtxProvider.Provider value={contextValues}>
      {children}
    </RealmCtxProvider.Provider>
  );
}

export const useRealmContext = () => {
  const context = useContext(RealmCtxProvider)

  if (context === undefined) {
    throw new Error('useRealmContext must be used within an RealmProvider')
  }
  return context
}

export default RealmContext
