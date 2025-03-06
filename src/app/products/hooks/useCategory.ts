import { useEffect, useState } from "react";

import { Collections } from "@/helpers/firestore/collections";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";
import { Category } from "@/helpers/firestore/model/product/category";
import { errorMessage } from "@/utils/texts";

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
        setError(errorMessage("ao obter as categorias."));
        setLoading(false);
      },
      transformer: (data) => new Category(data.id, data.name, data.pictureUrl),
    });
  }, [getBy, id]);

  return { category, loading, error };
}
