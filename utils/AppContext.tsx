import React, {
  useContext,
  createContext,
  useState,
  useRef,
  useEffect,
} from 'react'
import { InputViewType } from './types'
import { Animated } from 'react-native'
import { FormikConfig, useFormik } from 'formik'
import { customerValidationSchema } from './FormValidators'
// import { useRealm } from '@realm/react'
// import Realm from 'realm'

type FormValues = {
  name: string
  phone: string
  email: string
  address: string
  password: string
}

type AppContextT = {
  inputView: InputViewType
  setInputView: React.Dispatch<React.SetStateAction<InputViewType>>
  toggleAddView: () => void
  fadeAnim: Animated.Value
  // formikAddCustomer: ReturnType<typeof useFormik<Partial<FormValues>>>
  formikAuthenticate: ReturnType<typeof useFormik<Partial<FormValues>>>
}

const AppProvider = createContext<AppContextT | undefined>(undefined)

function AppContext({ children }: { children: React.ReactNode }) {
  const [inputView, setInputView] = useState<InputViewType>({
    isInput: false,
    inputType: null,
  })

  const fadeAnim = useRef(new Animated.Value(0)).current

  // Formik to add customer form
  // const formikConfigAddCustomer: FormikConfig<Partial<FormValues>> = {
  //   initialValues: {
  //     name: '',
  //     phone: '',
  //     email: '',
  //     address: '',
  //   },
  //   validationSchema: customerValidationSchema,
  //   onSubmit: () => {
  //     // Handle form submission here (e.g., call addNewCustomerHandler)
  //     // addNewCustomerHandler()
  //   },
  // }

  // const formikAddCustomer = useFormik(formikConfigAddCustomer)

  // Formik for Authenticate form
  const formikConfigAuthenticate: FormikConfig<Partial<FormValues>> = {
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: customerValidationSchema,
    onSubmit: () => {
      // Handle form submission here (e.g., call addNewCustomerHandler)
      // addNewCustomerHandler()
    },
  }

  const formikAuthenticate = useFormik(formikConfigAuthenticate)

  const toggleAddView = () => {
    console.log('Pressed ADD button')
    setInputView((prevInputView) => ({
      ...prevInputView,
      isInput: !prevInputView.isInput,
      inputType: 'ADD',
    }))
  }

  // const realm = useRealm()
  /*  add new customer */
  // const addNewCustomerHandler = () => {
  //   const { name, phone, email, address } = formik.values
  //   realm.write(() => {
  //     realm.create('Customer', {
  //       name,
  //       phone,
  //       email,
  //       address,
  //       _id: new Realm.BSON.ObjectId(),
  //     })
  //   })
  // }

  const toggleEditView = () => {
    console.log('Pressed EDIT button')
    setInputView((prevInputView) => ({
      ...prevInputView,
      isInput: !prevInputView.isInput,
      inputType: 'EDIT',
    }))
  }

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: inputView.isInput ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [inputView.isInput])

  const contextValues = {
    inputView,
    setInputView,
    toggleAddView,
    toggleEditView,
    fadeAnim,
    // formikAddCustomer,
    formikAuthenticate,
  }

  return (
    <AppProvider.Provider value={contextValues}>
      {children}
    </AppProvider.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(AppProvider)

  if (context === undefined) {
    throw new Error('useGlobalContext must be used within an AppProvider')
  }

  return context
}

export default AppContext
