"use client";

import { parseAsBoolean, useQueryState } from "nuqs";

import ActionFeedback from "@/components/basis/ActionFeedback";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import ProductForm from "../../ProductForm";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import useProduct from "../../hooks/useProduct";
import useSetProduct from "../../hooks/useSetProduct";

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();

  const { error, loading, product } = useProduct(id);

  const [_, setOpenProducts] = useQueryState("openProducts", {
    ...parseAsBoolean,
    defaultValue: true,
  });

  useEffect(() => {
    setOpenProducts(true);
  }, [setOpenProducts]);

  const {
    save,
    loading: loadingSave,
    error: errorSave,
    success: successSave,
    product: updated,
  } = useSetProduct(true);

  return (
    <>
      <PageTitle
        color="orange"
        title="Cadastro de produtos"
        isLoading={loadingSave || loading}
      />
      <LoadingContainer
        loading={loading || loadingSave}
        error={error !== null || product === null || errorSave !== null}
      >
        <div style={{ paddingBottom: "40px" }}>
          <ProductForm
            onSubmit={save}
            defaultValue={updated === undefined ? product : updated}
            loading={loading}
            error={error}
          />
        </div>
        {successSave && (
          <ActionFeedback
            message={successSave}
            open={successSave.length > 0}
            state="success"
            autoHideDuration={3000}
          />
        )}
      </LoadingContainer>
    </>
  );
}
