import React, {
  useContext,
  createContext,
  useState,
  useRef,
  useEffect,
} from 'react'
import { InputViewType } from './types'
import { Animated } from 'react-native'

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
  addNewCustomer: () => void
  setNewCustomer: React.Dispatch<React.SetStateAction<newCustomerType>>
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

  const toggleAddView = () => {
    console.log('Pressed ADD button')
    setInputView((prevInputView) => ({
      ...prevInputView,
      isInput: !prevInputView.isInput,
      inputType: 'ADD',
    }))
  }

  // to add new customer
  const addNewCustomer = () => {
    console.log('Customer added')
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
    addNewCustomer,
    setNewCustomer,
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
