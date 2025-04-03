import { useCallback, useState } from "react";

import { BaseModel } from "@/helpers/firestore/model/baseModel";
import useRealtime from "@/helpers/realtime/hooks/useRealtime";
import { References } from "@/helpers/realtime/references";
import { errorMessage } from "@/utils/texts";

export class StoreStatus implements BaseModel {
  constructor(id: string, storeStatus: boolean) {
    this.id = id;
    this._storeStatus = storeStatus;
  }

  id: string;

  private readonly _storeStatus: boolean;
  get storeStatus(): boolean {
    return this._storeStatus;
  }

  toJson() {
    return {
      id: this.id,
      storeStatus: this.storeStatus,
    };
  }
}

export default function useStoreStatus() {
  const { setValue, getSingle, listenToValue } = useRealtime();
  const [storeStatus, setStoreStatus] = useState<StoreStatus | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const listenToStoreStatus = useCallback(() => {
    listenToValue({
      onData: async (data) => {
        setStoreStatus(new StoreStatus(data[0].id, data[0].storeStatus));
        setLoading(false);
      },
      onError: () => {
        setError(errorMessage("ao obter o estado da loja"));
        setLoading(false);
      },
      reference: References.storeStatus,
    });
  }, [listenToValue]);

  const changeStoreStatus = useCallback(
    async (value: StoreStatus) => {
      setLoading(true);
      await setValue({
        id: "storeStatus",
        onData: (data) => {
          setStoreStatus(data);
          setLoading(false);
        },
        onError: () => {
          setError(errorMessage("ao definir o estado da loja"));
          setLoading(false);
        },
        reference: References.storeStatus,
        value,
      });
    },
    [setValue]
  );

  const getStoreStatus = useCallback(() => {
    setLoading(true);
    getSingle({
      id: "storeStatus",
      onData: async (data) => {
        if (data === undefined) {
          await changeStoreStatus(new StoreStatus("store-status", true));
        }
        setStoreStatus(new StoreStatus(data.id, data.storeStatus));
        setLoading(false);
      },
      onError: () => {
        setError(errorMessage("ao obter o estado da loja"));
        setLoading(false);
      },
      reference: References.storeStatus,
    });
  }, [changeStoreStatus, getSingle]);

  return {
    storeStatus,
    loading,
    error,
    changeStoreStatus,
    getStoreStatus,
    listenToStoreStatus,
  };
}
