import {
  getDatabase,
  get as getQuery,
  onValue,
  ref,
  remove,
  set,
} from "firebase/database";

import { app } from "@/firebase-config";
import { BaseModel } from "@/helpers/firestore/model/baseModel";
import { useCallback } from "react";

interface UseRealtimeParams<T extends BaseModel> {
  reference: string;
  id: string;
  onData: (data: any) => any;
  onError: () => void;
  value?: T;
}

export default function useRealtime<T extends BaseModel>() {
  const listenToValue = useCallback(
    async ({
      onError,
      onData,
      reference,
    }: Omit<UseRealtimeParams<T>, "id">) => {
      const db = getDatabase(app);
      const query = ref(db, reference);

      try {
        const unsubscribe = onValue(
          query,
          (snapshot) => {
            try {
              if (!snapshot.exists()) {
                onData([]);
                return;
              }

              const data = Object.values(snapshot.val());
              onData(data);
            } catch (processError) {
              console.error("Error processing snapshot:", processError);
              onError();
            }
          },
          (error) => {
            console.error("Error with onValue listener:", error);
            onError();
          }
        );

        return unsubscribe;
      } catch (error) {
        console.error("Error initializing listener:", error);
        onError();
      }
    },
    []
  );

  const setValue = useCallback(
    async ({ id, onData, onError, reference, value }: UseRealtimeParams<T>) => {
      if (value === undefined) throw Error("An value must be provided");

      console.log(value);

      const db = getDatabase(app);
      const query = ref(db, `${reference}/${id}`);

      try {
        await set(query, value.toJson());

        await onData(value);
      } catch (error) {
        console.log(error);
        onError();
      }
    },
    []
  );

  const get = useCallback(
    async ({
      onError,
      onData,
      reference,
    }: Omit<UseRealtimeParams<T>, "id">) => {
      const db = getDatabase(app);
      const query = ref(db, reference);

      try {
        const snapshot = await getQuery(query);

        if (!snapshot.exists()) {
          onData([]);
          return;
        }

        const data = Object.values(snapshot.val());

        onData(data);
      } catch (error) {
        console.log(error);
        onError();
      }
    },
    []
  );

  const getSingle = useCallback(
    async ({ onError, onData, reference, id }: UseRealtimeParams<T>) => {
      const db = getDatabase(app);
      const query = ref(db, `${reference}/${id}`);

      try {
        const snapshot = await getQuery(query);

        if (!snapshot.exists()) {
          onData(undefined);
          return;
        }

        onData(snapshot.val());
      } catch (error) {
        console.log(error);
        onError();
      }
    },
    []
  );

  const deleteSingle = useCallback(
    async ({
      id,
      onError,
      reference,
    }: Omit<UseRealtimeParams<T>, "onData">) => {
      const db = getDatabase(app);
      const query = ref(db, `${reference}/${id}`);

      try {
        await remove(query);
      } catch (error) {
        console.log(error);
        onError();
      }
    },
    []
  );

  return { listenToValue, getSingle, setValue, deleteSingle, get };
}
