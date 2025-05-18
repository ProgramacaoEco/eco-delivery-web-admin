import { errorMessage, successMessage } from "@/utils/texts";
import { useCallback, useEffect, useState } from "react";

import { auth } from "@/firebase-config";
import { Collections } from "@/helpers/firestore/collections";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";
import { User } from "@/helpers/firestore/model/admin/user";

export default function useUser() {
  const session = auth.currentUser;

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
        setUsers(users);
        setCurrentUser(
          users.filter(({ email }: User) => email === session?.email)[0]
        );
        setLoading(false);
      },
      onError: () => {
        setError(errorMessage("ao obter os usuários"));
        setLoading(false);
      },
    });
  }, [collection, get, session]);

  useEffect(() => {
    if (session) {
      getUser();
    }
  }, [getUser, session]);

  const setUser = async (user: User) => {
    setError(null);
    setLoading(true);
    await set({
      collection: collection,
      onError: () => {
        setError(errorMessage("ao adicionar o usuário"));
        setLoading(false);
      },
      onSuccess: () => {
        setSuccess(successMessage("Usuário adicionado"));
        setUsers((u) => [...u, user]);
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
