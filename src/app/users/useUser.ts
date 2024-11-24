import { Collections } from "@/helpers/firestore/collections";
import { User } from "@/helpers/firestore/model/user";
import useFirebase from "@/helpers/hooks/useFirebase";

export default function useUser() {

  const { set, get, remove} = useFirebase()

  const collection = Collections.Usuarios

  const setUser = async (user: User) => {
    await set({
      collection: collection, 
      data: user, 
      onErrorMessage: "ao adicionar o usuário", 
      onSuccessMessage: "Usuário adicionado"
    });
  } 

  const getUser = async () => {
    await get({
      collection: collection, 
      onData: (data) => new User(data.id, data.email, data.name, data.isAdmin) 
    });
  } 

  const removeUser = async (id: string) => {
    await remove({
      collection: collection, 
      id, 
      onErrorMessage: "ao remover o usuário", 
      onSuccessMessage: "Usuário removido"
    });
  } 

  return {setUser, getUser, removeUser}
}


