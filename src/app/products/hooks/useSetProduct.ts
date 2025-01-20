import { errorMessage, successMessage } from "@/utils/texts";

import { Collections } from "@/helpers/firestore/collections";
import { Product } from "@/helpers/firestore/model/product/product";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";
import { useState } from "react";
import useStorage from "@/helpers/storage/hooks/useStorage";

export default function useSetProduct(isEditing: boolean = false) {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { set } = useFirebase();
  const { upload } = useStorage();

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
        onSuccess: async (imagePath) => {
          const newProduct = new Product(
            product.id,
            product.description,
            product.value,
            product.category,
            product.inventory,
            imagePath
          );

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
              setProduct(newProduct);
              setLoading(false);
            },
            body: newProduct,
          });
        },
      });
    }

    const newProduct = new Product(
      product.id,
      product.description,
      product.value,
      product.category,
      product.inventory,
      product.image
    );

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
        setProduct(newProduct);
        setLoading(false);
      },
      body: newProduct,
    });
  };

  return { product, loading, success, error, save };
}
