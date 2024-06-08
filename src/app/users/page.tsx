"use client";

import NewUserForm from "./NewUserForm";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import { themeVars } from "@/theme/theme.css";

export default function Users() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <PageTitle
        color={themeVars.color.users.appbarColor}
        title="Configurações > Usuários"
      />
      <NewUserForm />
    </div>
  );
}
