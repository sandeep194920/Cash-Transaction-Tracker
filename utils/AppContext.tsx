import React, { useContext, createContext, useState } from "react";

type AppContextT = {
  isAddCustomerModalOpen: boolean;
  showCustomerModal: (show: boolean) => void;
  isTransactionModalOpen: boolean;
  showTransactionModal: (show: boolean) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppProvider = createContext<AppContextT | undefined>(undefined);
function AppContext({ children }: { children: React.ReactNode }) {
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // MODALS
  const showCustomerModal = (show: boolean) => {
    setIsAddCustomerModalOpen(show);
  };

  const showTransactionModal = (show: boolean) => {
    setIsTransactionModalOpen(show);
  };

  const contextValues = {
    isAddCustomerModalOpen,
    showCustomerModal,
    isTransactionModalOpen,
    showTransactionModal,
    isLoading,
    setIsLoading,
  };

  return (
    <AppProvider.Provider value={contextValues}>
      {children}
    </AppProvider.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(AppProvider);

  if (context === undefined) {
    throw new Error("useGlobalContext must be used within an AppProvider");
  }

  return context;
};

export default AppContext;
