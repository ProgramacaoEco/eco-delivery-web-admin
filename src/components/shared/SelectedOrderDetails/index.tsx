import "./style.css";

import { orderButtonContainer, totalContainer } from "./style.css";

import Order from "@/helpers/realtime/model/order/order";
import OrderButton from "./OrderButton";
import OrderHeader from "./OrderHeader";
import OrderPrintLayout from "./OrderPrintLayout";
import { OrderStatus } from "@/helpers/realtime/enum/order-status";
import OrderTable from "./OrderTable";
import OrderTableBody from "./OrderTableBody";
import OrderTableHead from "./OrderTableHead";
import { useEffect } from "react";

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

    if (selectedOrder.status === OrderStatus.new) {
      onUpdateStatus(OrderStatus.picking);
    }
  }, [onUpdateStatus, selectedOrder]);

  const total =
    selectedOrder?.items.reduce(
      (acc, { quantity, value }) => acc + quantity * value,
      0
    ) ?? 0;

  const freightCost = selectedOrder?.address.neighborhood.freightCost ?? 0;

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
          <div>
            R$
            {(
              selectedOrder?.address.neighborhood.freightCost ?? 0
            ).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
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
