import { useEffect, useState } from "react";

import { Collections } from "@/helpers/firestore/collections";
import { Product } from "@/helpers/firestore/model/product/product";
import { errorMessage } from "@/utils/texts";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";

export default function useReadSingleProduct(id: string) {
  const { getBy } = useFirebase();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBy({
      id,
      collection: Collections.Produtos,
      onLoading: setLoading,
      onData: setProduct,
      onError: () => setError(errorMessage("ao obter os produtos.")),
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
  }, [getBy, id]);

  return { product, loading, error };
}
