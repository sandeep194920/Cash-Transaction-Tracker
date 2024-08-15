import { useState } from "react";
import { Alert } from "react-native";

type PreDeleteConfirmation = {
  header: string;
  message: string;
  confirmDeleteCallback: () => void;
};

function useCardOptions() {
  const [isShowCardOptions, setIsShowCardOptions] = useState(false);

  const showCardOptions = () => {
    setIsShowCardOptions(true);
  };

  const hideCardOptions = () => {
    setIsShowCardOptions(false);
  };

  const deleteHandler = ({
    header,
    message,
    confirmDeleteCallback,
  }: PreDeleteConfirmation) => {
    Alert.alert(header, message, [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => setIsShowCardOptions(false),
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => confirmDelete(confirmDeleteCallback),
      },
    ]);
  };

  const confirmDelete = (callback: () => void) => {
    callback();
  };

  return {
    isShowCardOptions,
    showCardOptions,
    hideCardOptions,
    deleteHandler,
  };
}

export default useCardOptions;
