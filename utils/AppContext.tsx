import React, {
  useContext,
  createContext,
  useState,
  useRef,
  useEffect,
} from 'react'
import { InputViewType } from './types'
import { Animated } from 'react-native'
import { useFormik } from 'formik'
import { customerValidationSchema } from './FormValidators'

type newCustomerType = {
  name: string
  phone: string
  email: string
  address: string
}
type AppContextProps = {
  inputView: InputViewType
  setInputView: React.Dispatch<React.SetStateAction<InputViewType>>
  toggleAddView: () => void
  fadeAnim: Animated.Value
  addNewCustomerHandler: () => void
  formik: any
}

const initNewCustomer = {
  name: '',
  phone: '',
  email: '',
  address: '',
}

const AppProvider = createContext<AppContextProps | undefined>(undefined)

function AppContext({ children }: { children: React.ReactNode }) {
  const [inputView, setInputView] = useState<InputViewType>({
    isInput: false,
    inputType: null,
  })

  const fadeAnim = useRef(new Animated.Value(0)).current

  const [newCustomer, setNewCustomer] =
    useState<newCustomerType>(initNewCustomer)

  const formik = useFormik({
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
  })

  const toggleAddView = () => {
    console.log('Pressed ADD button')
    setInputView((prevInputView) => ({
      ...prevInputView,
      isInput: !prevInputView.isInput,
      inputType: 'ADD',
    }))
  }

  const addNewCustomerHandler = () => {}
  /* <-- to add new customer */

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
    setNewCustomer,
    addNewCustomerHandler,
    formik,
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
