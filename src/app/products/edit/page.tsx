"use client";

import ActionFeedback from "@/components/basis/ActionFeedback";
import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import Tile from "@/components/basis/Tile";
import useProducts from "../hooks/useProducts";
import { useRouter } from "next/navigation";

export default function ListProducts() {
  const {
    useDeleteProducts,
    useReadProducts,
    error,
    loading,
    success,
    products,
  } = useProducts();

  useReadProducts();
  const { removeProduct } = useDeleteProducts();

  const router = useRouter();

  return (
    <LoadingContainer loading={loading} error={error !== null}>
      <PageTitle title="Atualizar Cadastro" color="orange" />
      <ListTile>
        {products.map(({ description, id }) => (
          <Tile
            onEdit={() => router.push(`/products/edit/${id}`)}
            isEditable={true}
            onDelete={() => removeProduct(id)}
            key={id}
          >
            {description}
          </Tile>
        ))}
      </ListTile>
      {success && (
        <ActionFeedback
          message={success}
          open={success.length > 0}
          state="success"
          autoHideDuration={3000}
        />
      )}
    </LoadingContainer>
  );
}
