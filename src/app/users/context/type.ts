import { Dispatch, SetStateAction } from "react";

import { User } from "@/helpers/firestore/model/user";

export type UserContextType = {
  data: User[];
  successMessage?: string;
  success?: boolean;
  errorMessage?: string;
  error: boolean;
  loading: boolean;
  setSuccess: Dispatch<SetStateAction<boolean | undefined>>;
  setSuccessMessage: Dispatch<SetStateAction<string | undefined>>;
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>;
  setData: Dispatch<SetStateAction<User[]>>;
  setError: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  reset: () => void;
};
