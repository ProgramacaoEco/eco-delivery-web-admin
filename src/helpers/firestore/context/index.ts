import { CollectionContextType } from "./type";
import { createContext } from "react";

export const FirebaseContext = createContext<CollectionContextType<any>>({
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
