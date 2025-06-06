"use client";

import ActionFeedback from "@/components/basis/ActionFeedback";
import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import NewUserForm from "./NewUserForm";
import Tile from "@/components/basis/Tile";
import { User } from "@/helpers/firestore/model/admin/user";
import style from "./style.css";
import { useState } from "react";
import useUser from "./hooks/useUser";

export default function Users() {
  const { removeUser, setUser, error, loading, success, users, currentUser } =
    useUser();

  const [existingUser, setExistingUser] = useState(false);

  return (
    <>
      <LoadingContainer loading={loading} error={error !== null}>
        <div className={style}>
          <div style={{ marginTop: "20px", width: "inherit" }}>
            <NewUserForm
              onSubmit={async (usr) => {
                const user = users.find(
                  (element: User) => element.email === usr.email.trim()
                );

                if (user) {
                  setExistingUser(true);
                  return;
                }

                await setUser(usr);
              }}
            />
          </div>

          <ListTile>
            {users.length > 0 &&
              currentUser !== null &&
              users.map(
                ({ userName, isAdmin, id }: User) =>
                  id && (
                    <Tile
                      key={id}
                      isDeletable={
                        !isAdmin && currentUser.isAdmin && id !== currentUser.id
                      }
                      onDelete={() => removeUser(id)}
                    >
                      {userName}
                    </Tile>
                  )
              )}
          </ListTile>
        </div>
        {error && (
          <ActionFeedback
            message={error}
            autoHideDuration={3000}
            open={error.length > 0}
            state="error"
          />
        )}
        <ActionFeedback
          message="Usuário já existente"
          autoHideDuration={3000}
          open={existingUser}
          state="error"
        />
        {success && (
          <ActionFeedback
            message={success}
            open={success.length > 0}
            state="success"
            autoHideDuration={3000}
          />
        )}
      </LoadingContainer>
    </>
  );
}
