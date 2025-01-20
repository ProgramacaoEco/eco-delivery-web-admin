import { Controller, useForm } from "react-hook-form";

import InputText from "@/components/basis/InputText/InputText";
import Neighborhood from "@/helpers/firestore/model/neighborhood/neighborhood";
import Check from "@icons/Check";
import { IconButton } from "@mui/material";
import { CurrencyInput } from "react-currency-mask";

type NewNeighborhoodType = {
  id: string;
  neighborhoodName: string;
  freightCost: number;
};

interface NewNeighborhoodFormProps {
  onSubmit: (neighborhood: Neighborhood) => void;
}

export default function NewNeighborhoodForm({
  onSubmit,
}: NewNeighborhoodFormProps) {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<NewNeighborhoodType>({
    reValidateMode: "onChange",
  });

  return (
    <form
      autoComplete="new-password"
      onSubmit={handleSubmit(({ id, freightCost, neighborhoodName }) => {
        if (neighborhoodName || neighborhoodName.length > 2) {
          onSubmit(new Neighborhood(id, neighborhoodName, freightCost));
          reset();
        }
      })}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
      }}
    >
      <InputText
        label="Nome do bairro"
        id="neighborhoodName"
        {...register("neighborhoodName", {
          required: "Must be an valid neighborhood name",
          validate: (value) => value.length > 2,
        })}
        error={errors.neighborhoodName?.message !== undefined}
      />
      <Controller
        control={control}
        name="freightCost"
        rules={{
          min: 0.0,
        }}
        render={({ field }) => (
          <CurrencyInput
            {...field}
            onChangeValue={(_, value) => {
              field.onChange(value);
            }}
            InputElement={
              <InputText
                id="freightCost"
                error={errors.freightCost?.message !== undefined}
                label="Valor da entrega"
                mask="R$ "
              />
            }
          />
        )}
      />

      <IconButton type="submit">
        <Check fontSize={35} />
      </IconButton>
    </form>
  );
}
