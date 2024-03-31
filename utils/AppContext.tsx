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
  formikAuthenticate: ReturnType<typeof useFormik<Partial<FormValues>>>
  handleAuthSwitch: () => void
  showLoginPage: boolean
  creds: Partial<FormValues>
  setCreds: React.Dispatch<React.SetStateAction<Partial<FormValues>>>
}

const AppProvider = createContext<AppContextT | undefined>(undefined)

function AppContext({ children }: { children: React.ReactNode }) {
  const [inputView, setInputView] = useState<InputViewType>({
    isInput: false,
    inputType: null,
  })

  const [showLoginPage, setShowLoginPage] = useState(true)
  const [creds, setCreds] = useState<Partial<FormValues>>({
    email: '',
    password: '',
  })

  const fadeAnim = useRef(new Animated.Value(0)).current

  // authSwitch switches from login to register or vice-versa

  const handleAuthSwitch = () => {
    setShowLoginPage((pre) => !pre)
  }

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
    console.log('Pressed Plus button')
    setInputView((prevInputView) => ({
      ...prevInputView,
      isInput: !prevInputView.isInput,
      inputType: 'ADD',
    }))
  }

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
    showLoginPage,
    handleAuthSwitch,
    formikAuthenticate,
    creds,
    setCreds,
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
