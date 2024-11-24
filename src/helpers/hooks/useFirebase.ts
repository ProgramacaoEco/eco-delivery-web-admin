import { errorMessage, successMessage } from "@/utils/texts";

import { BaseModel } from "../firestore/model/baseModel";
import { Collections } from "@/helpers/firestore/collections";
import { FirebaseContext } from "../firestore/context";
import { FirestoreHelper } from "@/helpers/firestore";
import { useContext } from "react";

interface SetProps<T extends BaseModel> {
    data: T; 
    collection: Collections; 
    onSuccessMessage: string; 
    onErrorMessage: string;
}

interface GetProps<T extends BaseModel> {
    collection: Collections;
    onData: (data: any) => T;
}

interface RemoveProps {
    id: string;
    collection: Collections;
    onSuccessMessage: string;
    onErrorMessage: string
}

export default function useFirebase() {
  const {
    setLoading,
    setError,
    setErrorMessage,
    setSuccessMessage,
    setSuccess,
    setData,
    reset,
    success,
    data
  } = useContext(FirebaseContext);
  const set = async <T extends BaseModel>({collection, data, onErrorMessage, onSuccessMessage}: SetProps<T>) => {
    reset();

    setLoading(true);

    try {
      const success = await FirestoreHelper.set(collection, data);

      if (success) {
        setSuccess(true);
        setData((prevState) => [...prevState, data]);
        setSuccessMessage(successMessage(onSuccessMessage));
      } else {
        setError((_) => true);
        setErrorMessage(errorMessage(onErrorMessage));
      }
    } catch (error) {
      setError(true);
      setErrorMessage(errorMessage(onErrorMessage));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const get = async <T extends BaseModel>({collection, onData}: GetProps<T>) => {
    reset()

    setError(false);
      setLoading(true);
  
      if (success || typeof success === "undefined") {
        await FirestoreHelper.get(collection)
          .then((data) => {
            if (!!data) {
              setData(
                data.map(
                  onData
                )
              );
            } else {
              setData([]);
              setError(true);
            }
          })
          .catch((error) => {
            setError(true);
            setData([]);
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }

  }

  const remove = async ({collection, id, onErrorMessage, onSuccessMessage}: RemoveProps) => {
    reset();

    setLoading(true);

    try {
      const success = await FirestoreHelper.remove(id, collection);

      if (success) {
        setSuccess(true);
        const newData = data.filter(({ _id }) => id !== _id);
        setData([...newData]);
        setSuccessMessage(successMessage(onSuccessMessage));
      } else {
        setError(true);
        setErrorMessage(errorMessage(onErrorMessage));
      }
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { set, get, remove };
}


