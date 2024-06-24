import { useContext, useEffect, useState } from "react";

import { Collections } from "@/helpers/firestore/collections";
import { FirestoreHelper } from "@/helpers/firestore";
import { User } from "@/helpers/firestore/model/user";
import { UserContext } from "./context";

export default function useFetchUsers() {
  const { setError, setLoading, setData, success } = useContext(UserContext);

  useEffect(() => {
    setError(false);
    setLoading(true);

    if (success || typeof success === "undefined") {
      FirestoreHelper.get(Collections.Usuarios)
        .then((users) => {
          if (!!users) {
            setData(
              users.map(
                (user) => new User(user.id, user.email, user.name, user.isAdmin)
              )
            );
            setData((prevState) =>
              prevState.sort((a, b) => +b.isAdmin - +a.isAdmin)
            );
          } else {
            setData([]);
            setError(true);
          }
        })
        .catch((error) => {
          setError(true);
          setData([]);
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
