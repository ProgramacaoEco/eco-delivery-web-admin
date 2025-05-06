"use client";

import { Controller, useForm } from "react-hook-form";
import { container, form } from "./style.css";

import { CurrencyInput } from "react-currency-mask";
import InputText from "@/components/basis/InputText/InputText";
import LoadingContainer from "@/components/basis/LoadingContainer";
import { MinimumOrder } from "@/helpers/firestore/model/minimum-order/minimum-order";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import RoundedButton from "@/components/basis/Button/RoundedButton";
import { useEffect } from "react";
import useMinimumOrderPrice from "./hooks/useMinimumOrderPrice";

export default function MinimumOrderPrice() {
  const {
    setMinimumOrderPrice,
    getMinimumOrderPrice,
    error,
    loading,
    minimumOrderPriceData,
  } = useMinimumOrderPrice();

  const { handleSubmit, reset, control } = useForm<MinimumOrder>({
    defaultValues: {
      id: "minimumOrder",
      minimumOrderValue: 0,
    },
    reValidateMode: "onChange",
  });

  useEffect(() => {
    getMinimumOrderPrice();
  }, [getMinimumOrderPrice]);

  useEffect(() => {
    reset({ minimumOrderValue: minimumOrderPriceData?.minimumOrderValue || 0 });
  }, [reset, minimumOrderPriceData, loading]);

  const submit = () =>
    handleSubmit(({ minimumOrderValue }, event) => {
      event?.preventDefault();
      setMinimumOrderPrice(minimumOrderValue);
      reset();
    });

  return (
    <>
      <PageTitle isLoading={loading} color="purple" title="Pedido mínimo" />
      <LoadingContainer error={error !== undefined} loading={loading}>
        <div className={container}>
          <form onSubmit={submit()} className={form}>
            <Controller
              control={control}
              name="minimumOrderValue"
              render={({ field }) => (
                <CurrencyInput
                  {...field}
                  onChangeValue={(_, value) => {
                    field.onChange(value);
                  }}
                  InputElement={
                    <InputText
                      id="valor-minimo-pedido"
                      label="Valor mínimo do pedido"
                      mask="R$ "
                      style={{ marginBottom: "3rem" }}
                    />
                  }
                />
              )}
            />
            <RoundedButton
              style={{ width: "100%", backgroundColor: "purple" }}
              type="submit"
            >
              Salvar
            </RoundedButton>
          </form>
        </div>
      </LoadingContainer>
    </>
  );
}
