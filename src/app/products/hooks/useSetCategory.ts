import { errorMessage, successMessage } from "@/utils/texts";

import { Collections } from "@/helpers/firestore/collections";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";
import { Category } from "@/helpers/firestore/model/product/category";
import { Folders } from "@/helpers/storage/folders";
import useStorage from "@/helpers/storage/hooks/useStorage";
import { useState } from "react";

export default function useSetCategory(isEditing: boolean = false) {
  const [category, setCategory] = useState<Category>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { set } = useFirebase();
  const { upload } = useStorage(Folders.Categorias);

  const save = async (category: Category, file?: File) => {
    setLoading(true);
    setError(null);

    if (file !== undefined) {
      return await upload({
        id: category.name,
        file: file,
        onError: () => {
          setError(errorMessage("ao cadastrar imagem da categoria."));
          setLoading(false);
        },
        onSuccess: async (imagePath) => {
          const newCategory = new Category(
            category.name,
            category.name,
            imagePath!
          );

          await set({
            collection: Collections.Categorias,
            onError: () => {
              setError(
                errorMessage(
                  isEditing
                    ? "ao atualizar cadastro."
                    : "ao cadastrar categoria."
                )
              );
              setLoading(false);
            },
            onSuccess: () => {
              setSuccess(
                successMessage(
                  isEditing ? "Categoria atualizada" : "Categoria cadastrada"
                )
              );
              setCategory(newCategory);
              setLoading(false);
            },
            body: newCategory,
          });
        },
      });
    }

    const newCategory = new Category(
      category.name,
      category.name,
      category.pictureUrl
    );

    await set({
      collection: Collections.Categorias,
      onError: () => {
        setError(
          errorMessage(
            isEditing ? "ao atualizar cadastro." : "ao cadastrar categoria."
          )
        );
        setLoading(false);
      },
      onSuccess: () => {
        setSuccess(
          successMessage(
            isEditing ? "Categoria atualizada" : "Categoria cadastrada"
          )
        );
        setCategory(newCategory);
        setLoading(false);
      },
      body: newCategory,
    });
  };

  return { category, loading, success, error, save };
}
