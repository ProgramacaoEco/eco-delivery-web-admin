import { useCallback, useState } from "react";

import { MinimumOrder } from "@/helpers/realtime/model/minimum-order/minimum-order";
import { References } from "@/helpers/realtime/references";
import { errorMessage } from "@/utils/texts";
import useRealtime from "@/helpers/realtime/hooks/useRealtime";

export default function useMinimumOrderPrice() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [minimumOrderPriceData, setMinimumOrderPriceData] = useState<
    MinimumOrder | undefined
  >(undefined);

  const { get, setValue } = useRealtime();

  const setMinimumOrderPrice = useCallback(
    async (minimumOrderValue: number) => {
      setError(undefined);
      setLoading(true);
      const value = new MinimumOrder("minimumOrder", minimumOrderValue);
      await setValue({
        id: "minimumOrder",
        onData: () => {
          setMinimumOrderPriceData(value);
          setLoading(false);
        },
        onError: () => {
          setError(errorMessage("ao cadastrar o valor de pedido mínimo"));
          setLoading(false);
        },
        value,
        reference: References.minimumOrder,
      });
    },
    [setValue]
  );

  const getMinimumOrderPrice = useCallback(() => {
    setError(undefined);
    setLoading(true);
    get({
      onData: async (data) => {
        console.log(data);
        if (data.length !== 0) {
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
      reference: References.minimumOrder,
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
