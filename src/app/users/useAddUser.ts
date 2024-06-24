import { errorMessage, successMessage } from "@/utils/texts";

import { Collections } from "@/helpers/firestore/collections";
import { FirestoreHelper } from "@/helpers/firestore";
import { User } from "@/helpers/firestore/model/user";
import { UserContext } from "./context";
import { useContext } from "react";

export default function useAddUser() {
  const {
    setLoading,
    setError,
    setErrorMessage,
    setSuccessMessage,
    setSuccess,
    setData,
    reset,
  } = useContext(UserContext);
  const addUser = async (user: User) => {
    reset();

    setLoading(true);

    try {
      const success = await FirestoreHelper.set(Collections.Usuarios, user);

      if (success) {
        setSuccess(true);
        setData((prevState) => [...prevState, user]);
        setSuccessMessage(successMessage("Usuário cadastrado"));
      } else {
        setError((_) => true);
        setErrorMessage(errorMessage("ao cadastrar o usuário"));
      }
    } catch (error) {
      setError(true);
      setErrorMessage(errorMessage("ao cadastrar o usuário"));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { addUser };
}
