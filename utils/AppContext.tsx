import React, { useContext, createContext, useState, useRef } from "react";
import { InputViewType } from './types'
import { Animated } from "react-native";
import { FormikConfig, useFormik } from "formik";
import { customerValidationSchema } from "./FormValidators";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  address: string;
  password: string;
};

type AppContextT = {
  inputView: InputViewType;
  setInputView: React.Dispatch<React.SetStateAction<InputViewType>>;
  fadeAnim: Animated.Value;
  formikAuthenticate: ReturnType<typeof useFormik<Partial<FormValues>>>;
  handleAuthSwitch: () => void;
  showLoginPage: boolean;
  creds: Partial<FormValues>;
  setCreds: React.Dispatch<React.SetStateAction<Partial<FormValues>>>;
  isAddCustomerModalOpen: boolean;
  showCustomerModal: (show: boolean) => void;
  isAddTransactionModalOpen: boolean;
  showTransactionModal: (show: boolean) => void;
};

const AppProvider = createContext<AppContextT | undefined>(undefined);
function AppContext({ children }: { children: React.ReactNode }) {
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isAddTransactionModalOpen, setIsTransactionModalOpen] =
    useState(false);

  // MODALS
  const showCustomerModal = (show: boolean) => {
    setIsAddCustomerModalOpen(show);
  };

  const showTransactionModal = (show: boolean) => {
    setIsTransactionModalOpen(show);
  };

  const [inputView, setInputView] = useState<InputViewType>({
    isInput: false,
    inputType: null,
  });

  const [showLoginPage, setShowLoginPage] = useState(true);
  const [creds, setCreds] = useState<Partial<FormValues>>({
    email: "",
    password: "",
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  // authSwitch switches from login to register or vice-versa

  const handleAuthSwitch = () => {
    setShowLoginPage((pre) => !pre);
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
      // addNewCustomerHandler()
    },
  };

  const formikAuthenticate = useFormik(formikConfigAuthenticate);

  const contextValues = {
    inputView,
    setInputView,
    fadeAnim,
    showLoginPage,
    handleAuthSwitch,
    formikAuthenticate,
    creds,
    setCreds,
    isAddCustomerModalOpen,
    showCustomerModal,
    isAddTransactionModalOpen,
    showTransactionModal,
  };

  return (
    <AppProvider.Provider value={contextValues}>
      {children}
    </AppProvider.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(AppProvider)

  if (context === undefined) {
    throw new Error('useGlobalContext must be used within an AppProvider')
  }

  return context
}

export default AppContext
