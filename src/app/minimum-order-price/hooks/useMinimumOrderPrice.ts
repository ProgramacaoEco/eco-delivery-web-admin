import { useCallback, useState } from "react";

import { Collections } from "@/helpers/firestore/collections";
import { MinimumOrder } from "@/helpers/firestore/model/minimum-order/minimum-order";
import { errorMessage } from "@/utils/texts";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";

export default function useMinimumOrderPrice() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [minimumOrderPriceData, setMinimumOrderPriceData] = useState<
    MinimumOrder | undefined
  >(undefined);

  const { get, set } = useFirebase();

  const setMinimumOrderPrice = useCallback(
    async (minimumOrderValue: number) => {
      setError(undefined);
      setLoading(true);
      const value = new MinimumOrder("minimumOrder", minimumOrderValue);
      await set({
        onSuccess: () => {
          setMinimumOrderPriceData(value);
          setLoading(false);
        },
        onError: () => {
          setError(errorMessage("ao cadastrar o valor de pedido mínimo"));
          setLoading(false);
        },
        body: value,
        collection: Collections.Pedido_Minimo,
      });
    },
    [set]
  );

  const getMinimumOrderPrice = useCallback(() => {
    setError(undefined);
    setLoading(true);
    get({
      transformer: (data) =>
        new MinimumOrder("minimumOrder", data.minimumOrderValue),
      onData: async (data) => {
        console.log(data);
        if (data) {
          setMinimumOrderPriceData(
            new MinimumOrder("minimumOrder", data[0].minimumOrderValue)
          );
        } else {
          await setMinimumOrderPrice(0);
        }

        setLoading(false);
      },
      onError: () => {
        setError(errorMessage("ao obter o valor cadastrado de pedido mínimo"));
        setLoading(false);
      },
      collection: Collections.Pedido_Minimo,
    });
  }, [get, setMinimumOrderPrice]);

  return {
    setMinimumOrderPrice,
    getMinimumOrderPrice,
    error,
    loading,
    minimumOrderPriceData,
  };
}
