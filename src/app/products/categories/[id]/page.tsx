"use client";

import ActionFeedback from "@/components/basis/ActionFeedback";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import { useParams } from "next/navigation";
import CategoryForm from "../../CategoryForm";
import useCategory from "../../hooks/useCategory";
import useSetCategory from "../../hooks/useSetCategory";

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();

  const { error, loading, category } = useCategory(id);

  const {
    save,
    loading: loadingSave,
    error: errorSave,
    success: successSave,
    category: updated,
  } = useSetCategory(true);

  return (
    <>
      <PageTitle
        color="orange"
        title="Categorias"
        isLoading={loadingSave || loading}
      />
      <LoadingContainer
        loading={loading || loadingSave}
        error={error !== null || category === null || errorSave !== null}
      >
        <div style={{ paddingBottom: "40px" }}>
          <CategoryForm
            onSubmit={save}
            defaultValue={updated === undefined ? category : updated}
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
