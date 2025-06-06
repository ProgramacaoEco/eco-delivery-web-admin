"use client";

import { parseAsBoolean, useQueryState } from "nuqs";

import ActionFeedback from "@/components/basis/ActionFeedback";
import CategoryForm from "../../CategoryForm";
import LoadingContainer from "@/components/basis/LoadingContainer";
import useCategory from "../../hooks/useCategory";
import { useEffect } from "react";
import { useParams } from "next/navigation";
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

  const [_, setOpenProducts] = useQueryState("openProducts", {
    ...parseAsBoolean,
    defaultValue: true,
  });

  useEffect(() => {
    setOpenProducts(true);
  }, [setOpenProducts]);

  return (
    <>
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
