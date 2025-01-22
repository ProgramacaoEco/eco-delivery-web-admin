"use client";

import ActionFeedback from "@/components/basis/ActionFeedback";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import ProductForm from "../ProductForm";
import useSetProduct from "../hooks/useSetProduct";

export default function EditProduct() {
  const { save, loading, error, success } = useSetProduct();

  return (
    <>
      <PageTitle
        color="orange"
        title="Cadastro de produtos"
        isLoading={loading}
      />
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
