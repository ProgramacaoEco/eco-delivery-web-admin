"use client";

import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import NewUserForm from "./NewUserForm";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import Tile from "@/components/basis/Tile";
import { themeVars } from "@/theme/theme.css";
import useFetchUsers from "./useFetchUsers";
import { users } from "./style.css";

export default function Users() {
  const { data, error, loading } = useFetchUsers();

  return (
    <LoadingContainer loading={loading} error={error}>
      <div className={users}>
        <PageTitle color={themeVars.color.users.appbarColor} title="Usuários" />
        <div style={{ marginTop: "20px", width: "inherit" }}>
          <NewUserForm />
        </div>

        <ListTile>
          {data.map(({ userName }, index) => (
            <Tile key={userName} count={index}>
              {userName}
            </Tile>
          ))}
        </ListTile>
      </div>
    </LoadingContainer>
  );
}
