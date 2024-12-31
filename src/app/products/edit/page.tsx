"use client";

import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import Tile from "@/components/basis/Tile";
import { useRouter } from "next/navigation";
import useReadProducts from "../hooks/useReadProducts";

export default function ListProducts() {
  const { error, loading, products } = useReadProducts();

  const router = useRouter();

  return (
    <LoadingContainer loading={loading} error={error !== null}>
      <PageTitle title="Atualizar Cadastro" color="orange" />
      <ListTile>
        {products.map(({ description, id }) => (
          <Tile
            onEdit={() => router.push(`/products/edit/${id}`)}
            isEditable={true}
            key={id}
          >
            {description}
          </Tile>
        ))}
      </ListTile>
    </LoadingContainer>
  );
}
