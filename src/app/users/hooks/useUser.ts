import { errorMessage, successMessage } from "@/utils/texts";
import { useCallback, useEffect, useState } from "react";

import { Collections } from "@/helpers/firestore/collections";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";
import { User } from "@/helpers/firestore/model/admin/user";
import { useSession } from "next-auth/react";

export default function useUser() {
  const { data: sessionData } = useSession();

  const { set, get, remove } = useFirebase();

  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const collection = Collections.Usuarios;

  const getUser = useCallback(async () => {
    setError(null);
    setLoading(true);
    await get({
      collection: collection,
      transformer: (data) =>
        new User(data.id, data.email, data.name, data.isAdmin),
      onData: (users) => {
        if (sessionData && loading) {
          setLoading(false);
        }
        setUsers(users);
        setCurrentUser(
          users.filter(
            ({ email }: User) => email === sessionData?.user?.email
          )[0]
        );
      },
      onError: () => {
        setError(errorMessage("ao obter os usuários"));
        if (sessionData && loading) {
          setLoading(false);
        }
      },
    });
  }, [collection, get, loading, sessionData]);

  useEffect(() => {
    if (sessionData) {
      getUser();
    }
  }, [getUser, sessionData]);

  const setUser = async (user: User) => {
    setError(null);
    setLoading(true);
    await set({
      collection: collection,
      data: users,
      onError: () => {
        setError(errorMessage("ao adicionar o usuário"));
        setLoading(false);
      },
      onSuccess: () => setSuccess(successMessage("Usuário adicionado")),
      transformer: (data) =>
        new User(data.id, data.email, data.userName, data.isAdmin),
      onData: (data) => {
        setUsers((u) => [...u, data]);
        setLoading(false);
      },
      body: user,
    });
  };

  const removeUser = async (id: string) => {
    setError(null);
    setLoading(true);
    await remove({
      collection: collection,
      id,
      data: users,
      onData: setUsers,
      onError: () => {
        setError(errorMessage("ao remover o usuário"));
        setLoading(false);
      },
      onSuccess: () => {
        setSuccess(successMessage("Usuário removido"));
        setLoading(false);
      },
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
