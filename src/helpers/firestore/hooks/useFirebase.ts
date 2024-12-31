import { FirestoreHelper } from "@/helpers/firestore";
import { Collections } from "@/helpers/firestore/collections";
import { useCallback } from "react";
import { BaseModel } from "../model/baseModel";

interface SetProps<T extends BaseModel> {
  collection: Collections;
  body: T;
  data?: T[];
  onData?: (data: any) => void;
  transformer?: (data: any) => T;
  onSuccess?: () => void;
  onError: () => void;
}

interface GetProps<T extends BaseModel> {
  collection: Collections;
  onData: (data: any) => void;
  transformer: (data: any) => T;
  onError: () => void;
}

interface GetByProps<T extends BaseModel> {
  id: string;
  collection: Collections;
  transformer: (data: any) => T;
  onData: (data: any) => void;
  onError: () => void;
}

interface RemoveProps<T extends BaseModel> {
  id: string;
  collection: Collections;
  data: T[];
  onData: (data: any) => void;
  onSuccess: () => void;
  onError: () => void;
}

export default function useFirebase<T extends BaseModel>() {
  const set = useCallback(
    async ({
      collection,
      onError,
      onSuccess,
      data,
      body,
      onData,
      transformer,
    }: SetProps<T>) => {
      try {
        const success = await FirestoreHelper.set(collection, body);

        if (success) {
          if (onSuccess !== undefined) onSuccess();
          if (onData !== undefined && transformer != undefined) {
            onData(transformer(data));
          }
        } else {
          onError();
        }
      } catch (error) {
        onError();
        console.error(error);
      }
    },
    []
  );

  const get = useCallback(
    async ({ collection, onData, onError, transformer }: GetProps<T>) => {
      try {
        const data = await FirestoreHelper.get(collection);

        if (data !== null && data?.length > 0) {
          onData(data.map(transformer));
        } else {
          onData([]);
        }
      } catch (error) {
        onError();
        console.error(error);
      }
    },
    []
  );

  const getBy = useCallback(
    async ({ id, collection, onData, onError, transformer }: GetByProps<T>) => {
      try {
        const data = await FirestoreHelper.getBy(id, collection);

        if (!!data) {
          onData(transformer(data));
        } else {
          onData(null);
        }
      } catch (error) {
        onError();
        onData(null);
        console.error(error);
      }
    },
    []
  );

  const remove = useCallback(
    async ({
      collection,
      id,
      onError,
      onSuccess,
      data,
      onData,
    }: RemoveProps<T>) => {
      try {
        const success = await FirestoreHelper.remove(id, collection);

        if (success) {
          onSuccess();
          const newData: T[] = data.filter(
            ({ id: currentIdIterated }: T) => currentIdIterated !== id
          );
          onData(newData);
        } else {
          onError();
        }
      } catch (error) {
        onError();
        console.error(error);
      }
    },
    []
  );

  return { set, get, getBy, remove };
}
