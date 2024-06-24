import { PropsWithChildren, useState } from "react";

import { User } from "@/helpers/firestore/model/user";
import { UserContext } from "./";

export default function UserProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const reset = () => {
    setError(false);
    setErrorMessage(undefined);
    setSuccess(undefined);
    setSuccessMessage(undefined);
  };

  return (
    <UserContext.Provider
      value={{
        data,
        errorMessage,
        loading,
        success,
        successMessage,
        error,
        reset,
        setData,
        setError,
        setErrorMessage,
        setLoading,
        setSuccessMessage,
        setSuccess,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
