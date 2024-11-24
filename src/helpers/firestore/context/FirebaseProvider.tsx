import { PropsWithChildren, useState } from "react";

import { FirebaseContext } from ".";

export default function FirebaseProvider<T>({ children }: PropsWithChildren) {
  const [data, setData] = useState<T[]>([]);
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
    <FirebaseContext.Provider
      value={{
        data,
        loading,
        error,
        errorMessage,
        success,
        successMessage,
        setData,
        setLoading,
        setError,
        setSuccess,
        setSuccessMessage,
        setErrorMessage,
        reset,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
