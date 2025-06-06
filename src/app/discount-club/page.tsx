"use client";

import { Controller, useForm } from "react-hook-form";
import {
  activeClubMessage,
  checkbox,
  checkboxContainer,
  checkboxInput,
  clubInfo,
  container,
  form,
  info,
  submitButton,
  toggleContainer,
  toggleInternal,
} from "./style.css";
import { useEffect, useState } from "react";

import ActionFeedback from "@/components/basis/ActionFeedback";
import { CurrencyInput } from "react-currency-mask";
import { Discount } from "@/helpers/firestore/model/discount-club/discount";
import InputText from "@/components/basis/InputText/InputText";
import LoadingContainer from "@/components/basis/LoadingContainer";
import RoundedButton from "@/components/basis/Button/RoundedButton";
import { successMessage } from "@/utils/texts";
import useDiscountClub from "./hooks/useDiscountClubPrice";

export default function DiscountClub() {
  const {
    setDiscountClub,
    getDiscountClub,
    error,
    success: hookSuccess,
    loading,
    discountClubData,
  } = useDiscountClub();

  const [success, setSuccess] = useState<string | null>(null);

  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState,
    setError,
    clearErrors,
  } = useForm<Discount>({
    defaultValues: {
      id: "",
      discountPerStepValue: 0,
      purchaseStepValue: 0,
      enabled: false,
    },
    reValidateMode: "onChange",
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const purchaseStepValue = watch("purchaseStepValue");
  const discountPerStepValue = watch("discountPerStepValue");
  const enabled = watch("enabled");

  useEffect(() => {
    getDiscountClub();
  }, [getDiscountClub]);

  useEffect(() => {
    if (discountClubData !== undefined) {
      reset(
        {
          purchaseStepValue: discountClubData.purchaseStepValue ?? 0,
          discountPerStepValue: discountClubData.discountPerStepValue ?? 0,
          enabled: discountClubData.enabled ?? false,
        },
        {
          keepDirty: false,
          keepTouched: false,
        }
      );
    }
  }, [reset, discountClubData]);

  useEffect(() => {
    // Sempre que os erros mudarem, atualize a mensagem de erro de validação
    if (formState.errors.discountPerStepValue?.message) {
      setValidationError(
        formState.errors.discountPerStepValue.message as string
      );
    } else {
      setValidationError(null);
    }
  }, [formState.errors]);

  useEffect(() => {
    if (hookSuccess) setSuccess(hookSuccess);
  }, [hookSuccess]);

  const onSubmit = handleSubmit((data, event) => {
    event?.preventDefault();

    // Validação customizada
    if (data.enabled) {
      if (data.purchaseStepValue && !data.discountPerStepValue) {
        setError("discountPerStepValue", {
          type: "manual",
          message: "Preencha o valor do desconto.",
        });
        return;
      }
      if (Number(data.discountPerStepValue) > Number(data.purchaseStepValue)) {
        setError("discountPerStepValue", {
          type: "manual",
          message: "O valor do desconto não pode ser maior que o valor gasto.",
        });
        return;
      }
    }

    setDiscountClub(
      data.purchaseStepValue,
      data.discountPerStepValue,
      data.enabled
    );

    if (!data.enabled) {
      setSuccess(successMessage("Clube de descontos desativado"));
    } else {
      console.log("#### 1");
      setSuccess(successMessage("Club de descontos configurado"));
    }

    reset();
    clearErrors();
  });

  return (
    <>
      <LoadingContainer error={error !== undefined} loading={loading}>
        <div className={container}>
          <form onSubmit={onSubmit} className={form}>
            <Controller
              control={control}
              name="enabled"
              render={({ field }) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: enabled ? undefined : "60vh",
                    padding: enabled ? undefined : "10vh 0",
                    background: enabled
                      ? undefined
                      : "linear-gradient(90deg, #274B6D 0%, #3A8DFF 100%)",
                    borderRadius: enabled ? undefined : 24,
                    boxShadow: enabled
                      ? undefined
                      : "0 4px 32px 0 rgba(44, 62, 80, 0.08)",
                    marginBottom: enabled ? "2rem" : 0,
                    transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
                  }}
                >
                  <div className={checkboxContainer}>
                    <span style={{ marginRight: "1rem", color: "black" }}>
                      Ativar clube de descontos
                    </span>
                    <span
                      className={checkbox}
                      onClick={() => {
                        // Se estiver ativando, só altera o valor localmente
                        if (!field.value) {
                          field.onChange(true);
                          clearErrors();
                        } else {
                          // Se estiver desativando, salva imediatamente
                          setDiscountClub(
                            purchaseStepValue,
                            discountPerStepValue,
                            false
                          );
                          setSuccess(
                            successMessage("Clube de descontos desativado")
                          );
                          field.onChange(false);
                          clearErrors();
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <input
                        type="checkbox"
                        name={field.name}
                        ref={field.ref}
                        checked={field.value}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange(true);
                            clearErrors();
                          } else {
                            setDiscountClub(
                              purchaseStepValue,
                              discountPerStepValue,
                              false
                            );
                            setSuccess(
                              successMessage("Clube de descontos desativado")
                            );
                            field.onChange(false);
                            clearErrors();
                          }
                        }}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                        className={checkboxInput}
                      />
                      <span
                        style={{
                          background: field.value ? "#4ade80" : "#ccc",
                        }}
                        className={toggleContainer}
                      />
                      <span
                        style={{
                          left: field.value ? 24 : 2,
                        }}
                        className={toggleInternal}
                      />
                    </span>
                  </div>
                  {!enabled && (
                    <span className={activeClubMessage}>
                      Ative o clube de descontos para configurar as regras de
                      campanha e oferecer benefícios aos seus clientes.
                    </span>
                  )}
                </div>
              )}
            />
            {enabled && (
              <>
                <div className={info}>
                  {`A cada ${
                    purchaseStepValue
                      ? `R$ ${Number(purchaseStepValue).toLocaleString(
                          "pt-BR",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}`
                      : "___"
                  } gastos, ganhe ${
                    discountPerStepValue
                      ? `R$ ${Number(discountPerStepValue).toLocaleString(
                          "pt-BR",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}`
                      : "___"
                  } de desconto`}
                </div>
                <Controller
                  control={control}
                  name="purchaseStepValue"
                  render={({ field }) => (
                    <CurrencyInput
                      {...field}
                      onChangeValue={(_, value) => {
                        field.onChange(value);
                      }}
                      InputElement={
                        <InputText
                          id="purchase-step-value"
                          label="Valor gasto para ganhar desconto"
                          mask="R$ "
                          style={{ marginBottom: "2rem" }}
                          disabled={!enabled}
                        />
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="discountPerStepValue"
                  render={({ field }) => (
                    <CurrencyInput
                      {...field}
                      onChangeValue={(_, value) => {
                        field.onChange(value);
                      }}
                      InputElement={
                        <InputText
                          id="discount-per-step"
                          label="Valor do desconto"
                          mask="R$ "
                          style={{ marginBottom: "3rem" }}
                          disabled={!enabled}
                        />
                      }
                    />
                  )}
                />
                <span className={clubInfo}>
                  O clube só será ativado/atualizado efetivamente após salvar.
                </span>
                <RoundedButton
                  className={submitButton}
                  type="submit"
                  disabled={loading}
                >
                  Salvar
                </RoundedButton>
              </>
            )}
          </form>
        </div>
      </LoadingContainer>
      {success && (
        <ActionFeedback
          open={!!success}
          message={success}
          state="success"
          autoHideDuration={3000}
          onClose={() => setSuccess(null)}
        />
      )}
      {(error || validationError) && (
        <ActionFeedback
          message={(error || validationError) ?? "Erro desconhecido"}
          autoHideDuration={3000}
          open={!!error || !!validationError}
          state="error"
        />
      )}
    </>
  );
}
