"use client";

import { parseAsBoolean, useQueryState } from "nuqs";

import ActionFeedback from "@/components/basis/ActionFeedback";
import CategoryForm from "../../CategoryForm";
import LoadingContainer from "@/components/basis/LoadingContainer";

import { useEffect } from "react";
import useSetCategory from "../../hooks/useSetCategory";
import PageTitle from "@/components/basis/PageTitle/PageTitle";

export default function NewCategory() {
  const {
    save,
    loading: loadingSave,
    error: errorSave,
    success: successSave,
  } = useSetCategory(true);

  const [_, setOpenProducts] = useQueryState("openProducts", {
    ...parseAsBoolean,
    defaultValue: true,
  });

  useEffect(() => {
    setOpenProducts(true);
  }, [setOpenProducts]);
  return (
    <>
      <PageTitle
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
