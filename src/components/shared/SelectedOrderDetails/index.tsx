import "./style.css";

import { orderButtonContainer, totalContainer } from "./style.css";

import { OrderStatus } from "@/helpers/realtime/enum/order-status";
import Order from "@/helpers/realtime/model/order/order";
import { useEffect } from "react";
import OrderButton from "./OrderButton";
import OrderHeader from "./OrderHeader";
import OrderPrintLayout from "./OrderPrintLayout";
import OrderTable from "./OrderTable";
import OrderTableBody from "./OrderTableBody";
import OrderTableHead from "./OrderTableHead";

interface OrderDetailsProps {
  selectedOrder?: Order | null;
  onUpdateStatus: (status: OrderStatus) => void;
}

export default function SelectedOrderDetails({
  selectedOrder,
  onUpdateStatus,
}: OrderDetailsProps) {
  useEffect(() => {
    if (!selectedOrder) return;

    if (
      selectedOrder.address === null &&
      selectedOrder.status === OrderStatus.new
    ) {
      return onUpdateStatus(OrderStatus.sent);
    }

    if (
      selectedOrder.address !== null &&
      selectedOrder.status === OrderStatus.new
    ) {
      return onUpdateStatus(OrderStatus.picking);
    }
  }, [onUpdateStatus, selectedOrder]);

  const total =
    selectedOrder?.items.reduce(
      (acc, { quantity, product }) => acc + quantity * product.value,
      0
    ) ?? 0;

  const freightCost = selectedOrder?.address?.neighborhood?.freightCost ?? 0;

  return (
    <>
      <OrderTable>
        <OrderHeader selectedOrder={selectedOrder} />
        <OrderTableHead />
        <OrderTableBody selectedOrder={selectedOrder} />
      </OrderTable>

      <div className={totalContainer}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: "bold" }}>Entrega</div>
          {selectedOrder?.address?.neighborhood?.freightCost ? (
            <div>
              R$
              {(
                selectedOrder?.address?.neighborhood.freightCost ?? 0
              ).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          ) : (
            <div>RETIRADA</div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: "bold" }}>Forma de pagamento</div>
          <div>{selectedOrder?.paymentMethod}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: "bold" }}>Total</div>
          <div>
            R${" "}
            {(total + freightCost).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      </div>

      <div className={orderButtonContainer}>
        <OrderButton
          onUpdateStatus={onUpdateStatus}
          selectedOrder={selectedOrder}
        />
      </div>
      <OrderPrintLayout selectedOrder={selectedOrder} />
    </>
  );
}
