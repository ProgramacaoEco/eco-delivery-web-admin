import { useEffect, useState } from "react";

import { Collections } from "@/helpers/firestore/collections";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";
import { Product } from "@/helpers/firestore/model/product/product";
import { errorMessage } from "@/utils/texts";

export default function useReadProducts() {
  const { get } = useFirebase();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    get({
      collection: Collections.Produtos,
      onData: (products) => {
        setProducts(products);
        setLoading(false);
      },
      onError: () => {
        setError(errorMessage("ao obter os produtos."));
        setLoading(false);
      },
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
