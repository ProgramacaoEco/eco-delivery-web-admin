import { useEffect, useState } from "react";

import { Collections } from "@/helpers/firestore/collections";
import { Product } from "@/helpers/firestore/model/product/product";
import { errorMessage } from "@/utils/texts";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";

export default function useReadProducts() {
  const { get } = useFirebase();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    get({
      collection: Collections.Produtos,
      onData: setProducts,
      onError: () => setError(errorMessage("ao obter os produtos.")),
      onLoading: setLoading,
      transformer: (data) =>
        new Product(
          data.id,
          data.description,
          data.value,
          data.category,
          data.inventory,
          data.image
        ),
    });
  }, [get]);

  return { products, loading, error };
}
