import { UserContextType } from "./type";
import { createContext } from "react";

export const UserContext = createContext<UserContextType>({
  setData() {},
  setError() {},
  reset() {},
  setErrorMessage() {},
  setLoading() {},
  setSuccess() {},
  setSuccessMessage() {},
  loading: false,
  success: false,
  error: false,
  data: [],
});
