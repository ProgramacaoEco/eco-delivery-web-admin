"use client";

import ActionFeedback from "@/components/basis/ActionFeedback";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import ProductForm from "../ProductForm";
import useSetProducts from "../hooks/useSetProducts";

export default function EditProduct() {
  const { save, loading, error, success } = useSetProducts();

  return (
    <LoadingContainer loading={loading} error={error !== null}>
      <div style={{ paddingBottom: "40px" }}>
        <PageTitle
          color="orange"
          title="Cadastro de produtos"
          route="/products"
        />
        <ProductForm onSubmit={save} />
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
  );
}
