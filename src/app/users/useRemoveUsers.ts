import { errorMessage, successMessage } from "@/utils/texts";

import { Collections } from "@/helpers/firestore/collections";
import { FirestoreHelper } from "@/helpers/firestore";
import { UserContext } from "./context";
import { useContext } from "react";

export default function useRemoveUsers() {
  const {
    successMessage: message,
    data,
    setSuccess,
    setError,
    setErrorMessage,
    setSuccessMessage,
    setLoading,
    setData,
    reset,
  } = useContext(UserContext);

  const removeUser = async (id: string) => {
    reset();

    setLoading(true);

    try {
      const success = await FirestoreHelper.remove(id, Collections.Usuarios);

      if (success) {
        setSuccess(true);
        const newData = data.filter(({ _id }) => id !== _id);
        setData([...newData]);
        setSuccessMessage(successMessage("Usuário removido"));
      } else {
        setError(true);
        setErrorMessage(errorMessage("ao remover o usuário"));
      }
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { removeUser };
}
