"use client";

import "./style.css";

import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import SelectedOrderDetails from "@/components/shared/SelectedOrderDetails";
import { useEffect } from "react";
import useInvoices from "../hooks/useInvoices";
import { useParams } from "next/navigation";

export default function InvoicedDetails() {
  const { getInvoice, error, loading, selectedOrder } = useInvoices();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getInvoice(id);
  }, [id, getInvoice]);

  return (
    <>
      <PageTitle
        isLoading={loading}
        color="blue"
        title={
          selectedOrder
            ? `${selectedOrder.createdOn?.toLocaleDateString("pt-BR")}
            ${selectedOrder.createdOn?.toLocaleTimeString("pt-BR")} - ${
                selectedOrder?.orderIssuer
              }`
            : ""
        }
      />
      <LoadingContainer
        loading={loading}
        error={
          error === null &&
          selectedOrder === null &&
          selectedOrder === undefined
        }
      >
        <SelectedOrderDetails
          onUpdateStatus={() => {}}
          selectedOrder={selectedOrder}
        />
      </LoadingContainer>
    </>
  );
}
