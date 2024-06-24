import { Controller, useForm } from "react-hook-form";

import Check from "@icons/Check";
import { IconButton } from "@mui/material";
import InputText from "@/components/basis/InputText/InputText";
import { User } from "@/helpers/firestore/model/user";
import { emailVerificationRegex } from "../../../constants";

type NewUserFormType = {
  email: string;
  name: string;
};

interface NewUserFormProps {
  onSubmit: (user: User) => void;
}

export default function NewUserForm({ onSubmit }: NewUserFormProps) {
  const { handleSubmit, control, reset } = useForm<NewUserFormType>({
    defaultValues: {
      email: "",
      name: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(({ email, name }) => {
        onSubmit(new User(email, email, name));
        reset();
      })}
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
