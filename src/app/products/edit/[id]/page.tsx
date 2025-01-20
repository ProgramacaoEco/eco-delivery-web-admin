"use client";
import ActionFeedback from "@/components/basis/ActionFeedback";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import { useParams } from "next/navigation";
import useReadSingleProduct from "../../hooks/useReadSingleProduct";
import useSetProducts from "../../hooks/useSetProducts";
import ProductForm from "../../ProductForm";

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();

  const { error, loading, product } = useReadSingleProduct(id);

  const {
    save,
    loading: loadingSave,
    error: errorSave,
    success: successSave,
    updated,
  } = useSetProducts(true);

  return (
    <LoadingContainer
      loading={loading || loadingSave}
      error={error !== null || product === null || errorSave !== null}
    >
      <div style={{ paddingBottom: "40px" }}>
        <PageTitle
          color="orange"
          title="Cadastro de produtos"
          route="/products"
        />
        <ProductForm
          onSubmit={save}
          defaultValue={updated === undefined ? product : updated}
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
  );
}
