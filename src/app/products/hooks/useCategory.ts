import { useEffect, useState } from "react";

import { Category } from "@/helpers/firestore/model/product/category";
import { Collections } from "@/helpers/firestore/collections";
import { errorMessage } from "@/utils/texts";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";

export default function useCategory(id: string) {
  const { getBy } = useFirebase();

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    getBy({
      id,
      collection: Collections.Categorias,
      onData: (product) => {
        setCategory(product);
        setLoading(false);
      },
      onError: () => {
        setError(errorMessage("ao obter a categoria."));
        setLoading(false);
      },
      transformer: (data) => new Category(data.id, data.name, data.pictureUrl),
    });
  }, [getBy, id]);

  return { category, loading, error };
}
