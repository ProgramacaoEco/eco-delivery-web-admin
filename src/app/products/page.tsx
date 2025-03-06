"use client";

import { Add, Category, Grocery } from "@icons/index";

import Link from "next/link";
import PageTitle from "@/components/basis/PageTitle/PageTitle";

export default function Products() {
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PageTitle
          isLoading={false}
          color="orange"
          title="Cadastro de produtos"
        />
        <div style={{ display: "flex", gap: "100px" }}>
          <Link href="/products/new" style={{ all: "unset" }}>
            <div
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                border: "1px solid white",
                borderRadius: "50%",
                padding: "5rem",
              }}
            >
              <Add fontSize={150} />
              <div>Cadastrar novo produto</div>
            </div>
          </Link>
          <Link href="/products/edit" style={{ all: "unset" }}>
            <div
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                border: "1px solid white",
                borderRadius: "50%",
                padding: "5rem",
              }}
            >
              <Grocery fontSize={150} />
              <div>Ver ou editar produtos</div>
            </div>
          </Link>
          <Link href="/products/categories" style={{ all: "unset" }}>
            <div
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                border: "1px solid white",
                borderRadius: "50%",
                padding: "5rem",
                textAlign: "center",
              }}
            >
              <Category fontSize={155} />
              <div>Categorias</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
