import { get, getDatabase, onValue, ref } from "firebase/database";

import { app } from "@/firebase-config";
import { useCallback } from "react";

interface UseRealtimeParams {
  reference: string;
  id: string;
  onData: (data: any) => void;
  onLoading: (loading: boolean) => void;
  onError: () => void;
}

export default function useRealtime() {
  const listenToValue = useCallback(
    async ({
      onError,
      onLoading,
      onData,
      reference,
    }: Omit<UseRealtimeParams, "id">) => {
      const db = getDatabase(app);
      const query = ref(db, reference);

      onValue(
        query,
        (snapshot) => {
          onLoading(true);

          if (!snapshot.exists()) {
            onData([]);
            onLoading(false);
            return;
          }

          onData(Object.values(snapshot.val()));

          onLoading(false);
        },
        (error) => {
          console.log(error);
          onError();
          onLoading(false);
        }
      );
    },
    []
  );

  const getSingle = useCallback(
    async ({
      onError,
      onLoading,
      onData,
      reference,
      id,
    }: UseRealtimeParams) => {
      const db = getDatabase(app);
      const query = ref(db, `${reference}/${id}`);

      try {
        onLoading(true);
        const snapshot = await get(query);

        if (!snapshot.exists()) {
          onData(null);
          return;
        }

        onData(snapshot.val());
      } catch (error) {
        console.log(error);
        onError();
      } finally {
        onLoading(false);
      }
    },
    []
  );

  return { listenToValue, getSingle };
}
