"use client";

import { parseAsBoolean, useQueryState } from "nuqs";

import ActionFeedback from "@/components/basis/ActionFeedback";
import LoadingContainer from "@/components/basis/LoadingContainer";
import ProductForm from "../ProductForm";
import { useEffect } from "react";
import useSetProduct from "../hooks/useSetProduct";

export default function EditProduct() {
  const { save, loading, error, success } = useSetProduct();

  const [_, setOpenProducts] = useQueryState("openProducts", {
    ...parseAsBoolean,
    defaultValue: true,
  });

  useEffect(() => {
    setOpenProducts(true);
  }, [setOpenProducts]);

  return (
    <>
      <LoadingContainer loading={loading} error={error !== null}>
        <div style={{ paddingBottom: "40px" }}>
          <ProductForm onSubmit={save} loading={loading} error={error} />
        </div>
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
