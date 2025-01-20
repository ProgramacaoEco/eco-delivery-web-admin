import { errorMessage, successMessage } from "@/utils/texts";

import { Collections } from "@/helpers/firestore/collections";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";
import { Product } from "@/helpers/firestore/model/product/product";
import useStorage from "@/helpers/storage/hooks/useStorage";
import { useState } from "react";

export default function useSetProducts(isEditing: boolean = false) {
  const { set } = useFirebase();
  const { upload } = useStorage();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [updated, setUpdated] = useState<Product>();

  const save = async (product: Product, file?: File) => {
    setLoading(true);
    setError(null);

    if (file !== undefined) {
      return await upload({
        id: product.id,
        file: file,
        onError: () => {
          setError(errorMessage("ao cadastrar imagem do produto."));
          setLoading(false);
        },
        onSuccess: async (imagePath) =>
          await set({
            collection: Collections.Produtos,
            onError: () => {
              setError(
                errorMessage(
                  isEditing ? "ao atualizar cadastro." : "ao cadastrar produto."
                )
              );
              setLoading(false);
            },
            onSuccess: () => {
              setSuccess(
                successMessage(
                  isEditing ? "Produto atualizado" : "Produto cadastrado"
                )
              );
              setUpdated(product);
              setLoading(false);
            },
            body: new Product(
              product.id,
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
      onError: () => {
        setError(
          errorMessage(
            isEditing ? "ao atualizar cadastro." : "ao cadastrar produto."
          )
        );
        setLoading(false);
      },
      onSuccess: () => {
        setSuccess(
          successMessage(
            isEditing ? "Produto atualizado" : "Produto cadastrado"
          )
        );
        setUpdated(product);
        setLoading(false);
      },
      body: product,
    });
  };

  return { save, success, loading, error, updated };
}
