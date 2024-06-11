import { Controller, useForm } from "react-hook-form";

import Check from "@icons/Check";
import { IconButton } from "@mui/material";
import InputText from "@/components/basis/InputText/InputText";
import { emailVerificationRegex } from "../../../constants";

type NewUserFormType = {
  email: string;
  name: string;
};

export default function NewUserForm() {
  const { handleSubmit, control } = useForm<NewUserFormType>({
    defaultValues: {
      email: "",
      name: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        width: "100%",
      }}
    >
      <Controller
        name="email"
        rules={{
          required: true,
          pattern: emailVerificationRegex,
        }}
        control={control}
        render={({ field, fieldState: { invalid } }) => (
          <InputText label="E-mail do usuário" field={field} error={invalid} />
        )}
      />

      <Controller
        name="name"
        rules={{
          required: true,
          minLength: 3,
        }}
        control={control}
        render={({ field, fieldState: { invalid } }) => (
          <InputText label="Nome do usuário" field={field} error={invalid} />
        )}
      />
      <IconButton type="submit">
        <Check fontSize={35} />
      </IconButton>
    </form>
  );
}
