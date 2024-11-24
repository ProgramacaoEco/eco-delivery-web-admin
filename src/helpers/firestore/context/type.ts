import { Dispatch, SetStateAction } from "react";

export type CollectionContextType<T> = {
  data: T[];
  successMessage?: string;
  success?: boolean;
  errorMessage?: string;
  error: boolean;
  loading: boolean;
  setSuccess: Dispatch<SetStateAction<boolean | undefined>>;
  setSuccessMessage: Dispatch<SetStateAction<string | undefined>>;
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>;
  setData: Dispatch<SetStateAction<T[]>>;
  setError: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  reset: () => void;
};
