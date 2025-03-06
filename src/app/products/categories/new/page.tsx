"use client";

import ActionFeedback from "@/components/basis/ActionFeedback";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import CategoryForm from "../../CategoryForm";
import useSetCategory from "../../hooks/useSetCategory";

export default function NewCategory() {
  const {
    save,
    loading: loadingSave,
    error: errorSave,
    success: successSave,
  } = useSetCategory(true);

  return (
    <>
      <PageTitle
        color="orange"
        title="Nova Categoria"
        isLoading={loadingSave}
      />
      <LoadingContainer loading={loadingSave} error={errorSave !== null}>
        <div style={{ paddingBottom: "40px" }}>
          <CategoryForm
            onSubmit={save}
            loading={loadingSave}
            error={errorSave}
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
