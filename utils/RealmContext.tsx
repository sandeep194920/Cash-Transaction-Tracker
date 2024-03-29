import { FormikConfig, useFormik } from 'formik'
import React, { createContext, useContext, useState } from 'react'
import { customerValidationSchema } from './FormValidators'
import { InputViewType } from './types'
import { useRealm } from '@realm/react'

type FormValues = {
  name: string
  phone: string
  email: string
  address: string
  password: string
}

type RealmContextT = {
  formikAddCustomer: ReturnType<typeof useFormik<Partial<FormValues>>>
  formikAuthenticate: ReturnType<typeof useFormik<Partial<FormValues>>>
  //   toggleAddView: () => void
}

const RealmCtxProvider = createContext<RealmContextT | undefined>(undefined)

function RealmContext({ children }: { children: React.ReactNode }) {
  const [inputView, setInputView] = useState<InputViewType>({
    isInput: false,
    inputType: null,
  })

  const realm = useRealm()

  // Formik to add customer form
  const formikConfigAddCustomer: FormikConfig<Partial<FormValues>> = {
    initialValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
    },
    validationSchema: customerValidationSchema,
    onSubmit: () => {
      // Handle form submission here (e.g., call addNewCustomerHandler)
      addNewCustomerHandler()
    },
  }

  /*  add new customer */
  const addNewCustomerHandler = () => {
    const { name, phone, email, address } = formikAddCustomer.values
    realm.write(() => {
      realm.create('Customer', {
        name,
        phone,
        email,
        address,
        _id: new Realm.BSON.ObjectId(),
      })
    })
  }

  const formikAddCustomer = useFormik(formikConfigAddCustomer)

  // Formik for Authenticate form
  const formikConfigAuthenticate: FormikConfig<Partial<FormValues>> = {
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: customerValidationSchema,
    onSubmit: () => {
      // Handle form submission here (e.g., call addNewCustomerHandler)
    },
  }

  const formikAuthenticate = useFormik(formikConfigAuthenticate)

  const contextValues = {
    inputView,
    formikAddCustomer,
    formikAuthenticate,
  }

  return (
    <RealmCtxProvider.Provider value={contextValues}>
      {children}
    </RealmCtxProvider.Provider>
  )
}

export const useRealmContext = () => {
  const context = useContext(RealmCtxProvider)

  if (context === undefined) {
    throw new Error('useRealmContext must be used within an RealmProvider')
  }
  return context
}

export default RealmContext
