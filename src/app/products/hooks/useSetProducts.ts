import { errorMessage, successMessage } from "@/utils/texts";

import { BaseModel } from "@/helpers/firestore/model/baseModel";
import { Collections } from "@/helpers/firestore/collections";
import { Product } from "@/helpers/firestore/model/product/product";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";
import { useState } from "react";
import useStorage from "@/helpers/storage/hooks/useStorage";

export default function useSetProducts<T extends BaseModel>(
  isEditing: boolean = false
) {
  const { set } = useFirebase();
  const { upload } = useStorage();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [updated, setUpdated] = useState<T>();

  const save = async (product: Product, file?: File) => {
    setLoading(true);

    if (file !== undefined) {
      return await upload({
        id: product._id,
        file: file,
        onError: () =>
          setError(errorMessage("ao cadastrar imagem do produto.")),
        onLoading: setLoading,
        onSuccess: async (imagePath) =>
          await set({
            collection: Collections.Produtos,
            onError: () =>
              setError(
                errorMessage(
                  isEditing ? "ao atualizar cadastro." : "ao cadastrar produto."
                )
              ),
            onLoading: () => setLoading(false),
            transformer: (data) =>
              new Product(
                data.id,
                data.description,
                data.value,
                data.category,
                data.inventory,
                imagePath
              ),
            onData: setUpdated,
            onSuccess: () =>
              setSuccess(
                successMessage(
                  isEditing ? "Produto atualizado" : "Produto cadastrado"
                )
              ),
            body: new Product(
              product._id,
              product.description,
              product.value,
              product.category,
              product.inventory,
              imagePath
            ),
          }),
      });
    }

    await set({
      collection: Collections.Produtos,
      onError: () =>
        setError(
          errorMessage(
            isEditing ? "ao atualizar cadastro." : "ao cadastrar produto."
          )
        ),
      onLoading: setLoading,
      onSuccess: () =>
        setSuccess(
          successMessage(
            isEditing ? "Produto atualizado" : "Produto cadastrado"
          )
        ),
      transformer: () => {
        return new Product(
          product._id,
          product.description,
          product.value,
          product.category,
          product.inventory
        );
      },
      onData: setUpdated,
      body: product,
    });
  };

  return { save, success, loading, error, updated };
}
