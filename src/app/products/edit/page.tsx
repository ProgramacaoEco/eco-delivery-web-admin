"use client";

import { parseAsBoolean, useQueryState } from "nuqs";
import { useEffect, useState } from "react";

import ActionFeedback from "@/components/basis/ActionFeedback";
import InputText from "@/components/basis/InputText/InputText";
import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
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

  const [_, setOpenProducts] = useQueryState("openProducts", {
    ...parseAsBoolean,
    defaultValue: true,
  });

  useEffect(() => {
    setOpenProducts(true);
  }, [setOpenProducts]);

  useReadProducts();
  const { removeProduct } = useDeleteProducts();

  const router = useRouter();

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(
    (p) =>
      p.description.toUpperCase().includes(search.toUpperCase()) ||
      p.id.includes(search)
  );

  return (
    <>
      <LoadingContainer
        loading={loading}
        error={error !== null}
        isEmpty={products === undefined || products?.length <= 0}
        emptyMessage="Não há produtos cadastrados"
      >
        <div
          style={{
            padding: "1rem",
            zIndex: 10,
            width: "100%",
            backgroundColor: "GrayText",
            position: "sticky",
            top: 0,
            borderRadius: "10px",
          }}
        >
          <InputText
            label="Pesquisar por descrição ou código"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ListTile>
          {filteredProducts.map(({ description, id }) => (
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
    </>
  );
}
