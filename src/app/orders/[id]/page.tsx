"use client";

import "./style.css";

import { useContext, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import LoadingContainer from "@/components/basis/LoadingContainer";
import { OrderContext } from "../context/OrderContext";
import { OrderStatus } from "@/helpers/realtime/enum/order-status";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import SelectedOrderDetails from "../../../components/shared/SelectedOrderDetails";
import useOrders from "../hooks/useOrders";

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const { updateOrderStatus, getSingleOrder, setInvoice } = useOrders();
  const router = useRouter();
  const { loading, error, selectedOrder } = useContext(OrderContext);

  useEffect(() => {
    getSingleOrder(id);
  }, [getSingleOrder, id]);

  const onUpdateStatus = (status: OrderStatus) => {
    if (status === OrderStatus.sent) {
      window.print();
      if (selectedOrder) {
        selectedOrder.isViewed = true;
      }
      updateOrderStatus(status, selectedOrder);
    } else if (status === OrderStatus.delivered) {
      if (selectedOrder) {
        updateOrderStatus(status, selectedOrder, async (updatedOrder) => {
          await setInvoice(updatedOrder);
          router.back();
        });
      }
    } else {
      updateOrderStatus(status, selectedOrder);
    }
  };

  return (
    <>
      <PageTitle
        isLoading={loading}
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
      <LoadingContainer
        loading={loading}
        error={error !== undefined || selectedOrder === undefined}
      >
        {selectedOrder && (
          <SelectedOrderDetails
            onUpdateStatus={onUpdateStatus}
            selectedOrder={selectedOrder}
          />
        )}
      </LoadingContainer>
    </>
  );
}
