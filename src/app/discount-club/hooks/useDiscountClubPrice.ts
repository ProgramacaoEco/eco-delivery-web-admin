import { useCallback, useState } from "react";

import { Collections } from "@/helpers/firestore/collections";
import { errorMessage, successMessage } from "@/utils/texts";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";
import { Discount } from "@/helpers/firestore/model/discount-club/discount";

export default function useDiscountClub() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [discountClubData, setdiscountClubData] = useState<
    Discount | undefined
  >(undefined);

  const { get, set } = useFirebase();

  const setDiscountClub = useCallback(
    async (purchaseStepValue: number, discountPerStepValue: number, enabled: boolean) => {
      setError(undefined);
      setLoading(true);
      const value = new Discount("discountClub", purchaseStepValue, discountPerStepValue, enabled);
      await set({
        onSuccess: () => {
          setdiscountClubData(value);
          setLoading(false);
          
          setSuccess(successMessage(
            "Club de descontos configurado"
          ));
        },
        onError: () => {
          setError(errorMessage("ao cadastrar o club de descontos"));
          setLoading(false);
        },
        body: value,
        collection: Collections.Club_Descontos,
      });
    },
    [set]
  );

  const getDiscountClub = useCallback(() => {
    setError(undefined);
    setLoading(true);
    get({
      transformer: (data) =>
        new Discount(
          "discountClub",
          data.purchaseStepValue,
          data.discountPerStepValue,
          data.enabled ?? false
        ),
      onData: async (data) => {
        if (data) {
          setdiscountClubData(
            new Discount(
              "discountClub",
              data[0].purchaseStepValue,
              data[0].discountPerStepValue,
              data[0].enabled ?? false
            )
          );
        } else {
          setdiscountClubData(undefined);
        }
        setLoading(false);
      },
      onError: () => {
        setError(errorMessage("ao obter os dados do club de descontos"));
        setLoading(false);
      },
      collection: Collections.Club_Descontos,
    });
  }, [get, setDiscountClub]);

  return {
    setDiscountClub,
    getDiscountClub,
    error,
    loading,
    discountClubData,
    success,
  };
}
