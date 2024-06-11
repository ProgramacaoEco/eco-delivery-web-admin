import { useEffect, useState } from "react";

import { Collections } from "@/helpers/firestore/collections";
import { FirestoreHelper } from "@/helpers/firestore";
import { User } from "@/helpers/firestore/model/user";

export default function useFetchUsers() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(true);

    FirestoreHelper.get(Collections.Usuarios)
      .then((users) => {
        if (!!users) {
          setData(
            users.map((user) => new User(user.id, user.email, user.name))
          );
        } else {
          setData([]);
          setError(true);
        }
      })
      .catch((error) => {
        setError(true);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, data, error };
}
