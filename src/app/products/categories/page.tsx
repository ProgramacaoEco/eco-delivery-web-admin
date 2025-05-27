"use client";

import { parseAsBoolean, useQueryState } from "nuqs";

import { Add } from "@icons/index";
import Link from "next/link";
import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import Tile from "@/components/basis/Tile";
import useCategories from "../hooks/useCategories";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ListProducts() {
  const { categories, error, loading } = useCategories();

  const router = useRouter();

  const [_, setOpenProducts] = useQueryState("openProducts", {
    ...parseAsBoolean,
    defaultValue: true,
  });

  useEffect(() => {
    setOpenProducts(true);
  }, [setOpenProducts]);

  return (
    <>
      <PageTitle isLoading={loading} title="Categorias" color="orange" />
      <Link href={`/products/categories/new`}>
        <div
          style={{
            borderRadius: "3rem",
            padding: "2rem",
            border: "2px solid",
            gap: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <Add /> Nova Categoria
        </div>
      </Link>
      <LoadingContainer
        loading={loading}
        error={error !== null}
        isEmpty={categories === undefined || categories?.length <= 0}
        emptyMessage="Não há categorias cadastradas"
      >
        <div>
          <ListTile>
            {categories.map(({ name, id }) => (
              <Tile
                onEdit={() => router.push(`/products/categories/${id}`)}
                isEditable={true}
                isDeletable={false}
                key={id}
              >
                {name}
              </Tile>
            ))}
          </ListTile>
        </div>
      </LoadingContainer>
    </>
  );
}
