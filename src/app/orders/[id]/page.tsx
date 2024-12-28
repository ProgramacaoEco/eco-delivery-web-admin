"use client";

import "./style.css";

import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import Item from "@/helpers/realtime/model/order/item";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import useOrders from "../hooks/useOrders";

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const { getSingleOrder, loading, error, selectedOrder } = useOrders();

  useEffect(() => {
    getSingleOrder(id);
  }, [getSingleOrder, id]);

  return (
    <LoadingContainer
      loading={loading}
      error={error !== null && selectedOrder !== null}
    >
      <PageTitle
        color="blue"
        title={
          selectedOrder
            ? `${selectedOrder.createdOn?.toLocaleDateString("pt-BR")}
              ${selectedOrder.createdOn?.toLocaleTimeString("pt-BR")} - ${
                selectedOrder.orderIssuer
              }`
            : ""
        }
      />

      <div style={{ textAlign: "center" }}>
        <h2>{selectedOrder?.orderIssuer}</h2>
        <h3>
          {selectedOrder?.address.address}, {selectedOrder?.address.number} -{" "}
          {selectedOrder?.address.apt}
        </h3>
        <h3>
          {selectedOrder?.address.neighborhood},{" "}
          {selectedOrder?.address.postalCode}
        </h3>
        <h3>{selectedOrder?.address.reference}</h3>
      </div>

      <table style={{ width: "100%", marginTop: "2rem" }}>
        <thead>
          <tr>
            <td colSpan={1}>Cód.</td>
            <td colSpan={2}>Descrição</td>
            <td colSpan={2}>Qtd.</td>
            <td colSpan={2}>Valor</td>
          </tr>
        </thead>
        <tbody>
          {selectedOrder?.items?.map(
            ({ id, description, quantity, value }: Item) => (
              <tr key={description}>
                <td colSpan={1}>{id}</td>
                <td colSpan={2}>{description}</td>
                <td colSpan={2}>{quantity}</td>
                <td colSpan={2}>
                  R$
                  {(quantity * value).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            )
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Total</td>
            <td colSpan={2}>
              {selectedOrder?.items?.reduce(
                (accumulator: number, currentValue: Item) =>
                  accumulator + currentValue.quantity,
                0
              )}
            </td>
            <td colSpan={3}>
              R$
              {selectedOrder?.items
                ?.reduce(
                  (accumulator: number, currentValue: Item) =>
                    accumulator + currentValue.value * currentValue.quantity,
                  0
                )
                .toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </td>
          </tr>
        </tfoot>
      </table>
    </LoadingContainer>
  );
}
