import { BaseModel } from "../firestore/model/baseModel";
import { Collections } from "@/helpers/firestore/collections";
import { FirestoreHelper } from "@/helpers/firestore";

interface SetProps<T extends BaseModel> {
  collection: Collections;
  body: T;
  data: T[];
  onData: (data: any) => void;
  transformer: (data: any) => T;
  onSuccess: () => void;
  onError: () => void;
  onLoading: (loading: boolean) => void;
}

interface GetProps<T extends BaseModel> {
  collection: Collections;
  onData: (data: any) => void;
  transformer: (data: any) => T;
  onLoading: (loading: boolean) => void;
  onError: () => void;
}

interface GetByProps<T extends BaseModel> {
  id: string;
  collection: Collections;
  transformer: (data: any) => T;
  onData: (data: T | null) => void;
  onLoading: (loading: boolean) => void;
  onError: () => void;
}

interface RemoveProps<T extends BaseModel> {
  id: string;
  collection: Collections;
  data: T[];
  onData: (data: any) => void;
  onSuccess: () => void;
  onLoading: (loading: boolean) => void;
  onError: () => void;
}

export default function useFirebase<T extends BaseModel>() {
  const set = async ({
    collection,
    onError,
    onLoading,
    onSuccess,
    data,
    body,
    onData,
    transformer,
  }: SetProps<T>) => {
    onLoading(true);

    try {
      const success = await FirestoreHelper.set(collection, body);

      if (success) {
        onSuccess();
        onData([...data, body].map(transformer));
      } else {
        onError();
      }
    } catch (error) {
      onError();
      console.error(error);
    } finally {
      onLoading(false);
    }
  };

  const get = async ({
    collection,
    onData,
    onError,
    onLoading,
    transformer,
  }: GetProps<T>) => {
    onLoading(true);

    try {
      const data = await FirestoreHelper.get(collection);

      if (data !== null && data?.length > 0) {
        onData(data.map(transformer));
        console.log(data.map(transformer));
      } else {
        onData([]);
      }
    } catch (error) {
      onError();
      console.error(error);
      console.log(error);
    } finally {
      onLoading(false);
    }
  };

  const getBy = async ({
    id,
    collection,
    onData,
    onError,
    onLoading,
    transformer,
  }: GetByProps<T>) => {
    onLoading(true);

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
    } finally {
      onLoading(false);
    }
  };

  const remove = async ({
    collection,
    id,
    onError,
    onLoading,
    onSuccess,
    data,
    onData,
  }: RemoveProps<T>) => {
    onLoading(true);

    try {
      const success = await FirestoreHelper.remove(id, collection);

      if (success) {
        onSuccess();
        const newData: T[] = data.filter(({ _id }: T) => id !== _id);
        onData(newData);
      } else {
        onError();
      }
    } catch (error) {
      onError();
      console.error(error);
    } finally {
      onLoading(false);
    }
  };

  return { set, get, getBy, remove };
}
