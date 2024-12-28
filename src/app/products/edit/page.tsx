"use client";

import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import Tile from "@/components/basis/Tile";
import useReadProducts from "../hooks/useReadProducts";
import { useRouter } from "next/navigation";

export default function ListProducts() {
  const { error, loading, products } = useReadProducts();

  const router = useRouter();

  return (
    <LoadingContainer loading={loading} error={error !== null}>
      <PageTitle title="Atualizar Cadastro" color="orange" />
      <ListTile>
        {products.map(({ description, _id }) => (
          <Tile
            onEdit={() => router.push(`/products/edit/${_id}`)}
            isEditable={true}
            key={_id}
          >
            {description}
          </Tile>
        ))}
      </ListTile>
    </LoadingContainer>
  );
}
