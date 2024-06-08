import Check from "@icons/Check";
import { IconButton } from "@mui/material";
import InputText from "@/components/basis/InputText/InputText";
import { useState } from "react";

export default function NewUserForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  return (
    <form
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
      }}
    >
      <InputText
        label="E-mail do usuário"
        onChange={({ target }) => setEmail(target.value)}
        value={email}
      />
      <InputText
        label="Nome do usuário"
        onChange={({ target }) => setName(target.value)}
        value={name}
      />
      <IconButton>
        <Check fontSize={35} />
      </IconButton>
    </form>
  );
}
