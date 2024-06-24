import { getSession, useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

import ActionFeedback from "@/components/basis/ActionFeedback";
import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import NewUserForm from "./NewUserForm";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import Tile from "@/components/basis/Tile";
import { User } from "@/helpers/firestore/model/user";
import { UserContext } from "./context";
import { themeVars } from "@/theme/theme.css";
import useAddUser from "./useAddUser";
import useFetchUsers from "./useFetchUsers";
import useRemoveUsers from "./useRemoveUsers";
import { users } from "./style.css";

export default function UsersComponent() {
  useFetchUsers();

  const { removeUser } = useRemoveUsers();
  const { addUser } = useAddUser();

  const { loading, error, success, data, successMessage, errorMessage } =
    useContext(UserContext);
  const { data: sessionData } = useSession();

  const [existingUser, setExistingUser] = useState(false);
  const [pageHasError, setPageHasError] = useState(false);

  let currentUser: User;

  if (!!data) {
    currentUser = data.filter(
      ({ email }) => email === sessionData?.user?.email
    )[0];
  }

  useEffect(() => {
    if (!loading) {
      if (users.length <= 0) {
        console.log(loading);
        console.log(data.length);
        setPageHasError(true);
      }
    }
  }, [data, loading]);

  return (
    <LoadingContainer loading={loading} error={pageHasError}>
      <div className={users}>
        <PageTitle color={themeVars.color.users.appbarColor} title="Usuários" />
        <div style={{ marginTop: "20px", width: "inherit" }}>
          <NewUserForm
            onSubmit={async (usr) => {
              const user = data!.find(
                (element) => element.email === usr.email.trim()
              );

              if (user) {
                setExistingUser(true);
                return;
              }

              await addUser(usr);
            }}
          />
        </div>

        <ListTile>
          {data &&
            data.map(({ userName, isAdmin, _id }, index) => (
              <Tile
                key={userName}
                count={index}
                isDeletable={!isAdmin && currentUser.isAdmin}
                onDelete={() => removeUser(_id)}
              >
                {userName}
              </Tile>
            ))}
        </ListTile>
      </div>
      <ActionFeedback
        message={errorMessage}
        autoHideDuration={3000}
        open={error}
        state="error"
      />
      <ActionFeedback
        message="Usuário já existente"
        autoHideDuration={3000}
        open={existingUser}
        state="error"
      />
      <ActionFeedback
        message={successMessage}
        open={success ?? false}
        state="success"
        autoHideDuration={3000}
      />
    </LoadingContainer>
  );
}
