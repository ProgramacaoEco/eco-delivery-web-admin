import { errorMessage, successMessage } from "@/utils/texts";
import { useEffect, useState } from "react";

import { Collections } from "@/helpers/firestore/collections";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";
import { User } from "@/helpers/firestore/model/admin/user";
import { useSession } from "next-auth/react";

export default function useUser() {
  const { set, get, remove } = useFirebase();

  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const collection = Collections.Usuarios;

  const { data: sessionData } = useSession();

  useEffect(() => {
    if (sessionData) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionData]);

  const setUser = async (user: User) => {
    await set({
      collection: collection,
      data: users,
      onError: () => setError(errorMessage("ao adicionar o usuário")),
      onSuccess: () => setSuccess(successMessage("Usuário adicionado")),
      transformer: (data) =>
        new User(data.id, data.email, data.userName, data.isAdmin),
      onData: (data) => setUsers((u) => [...u, data]),
      onLoading: setLoading,
      body: user,
    });
  };

  const getUser = async () => {
    await get({
      collection: collection,
      transformer: (data) =>
        new User(data.id, data.email, data.name, data.isAdmin),
      onData: (users) => {
        setUsers(users);
        setCurrentUser(
          users.filter(
            ({ email }: User) => email === sessionData?.user?.email
          )[0]
        );
      },
      onError: () => setError(errorMessage("ao obter os usuários")),
      onLoading: (loading) => {
        if (sessionData && loading) {
          setLoading(false);
        }
      },
    });
  };

  const removeUser = async (id: string) => {
    await remove({
      collection: collection,
      id,
      data: users,
      onData: setUsers,
      onError: () => setError(errorMessage("ao remover o usuário")),
      onSuccess: () => setSuccess(successMessage("Usuário removido")),
      onLoading: setLoading,
    });
  };

  return {
    setUser,
    removeUser,
    loading,
    error,
    success,
    users,
    currentUser,
  };
}
