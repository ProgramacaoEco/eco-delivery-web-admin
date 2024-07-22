"use client";

import { Add, Grocery } from "@icons/index";

import Link from "next/link";
import PageTitle from "@/components/basis/PageTitle/PageTitle";

export default function Products() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PageTitle color="orange" title="Cadastro de produtos" />
      <div style={{ display: "flex", gap: "100px" }}>
        <Link href="/products/new" style={{all: "unset"}}>
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
        <button style={{ all: "unset" }}>
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
        </button>
      </div>
    </div>
  );
}
