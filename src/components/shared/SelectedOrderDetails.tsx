import { OrderStatus } from "@/helpers/realtime/enum/order-status";
import Item from "@/helpers/realtime/model/order/item";
import Order from "@/helpers/realtime/model/order/order";
import { useEffect } from "react";
import RoundedButton from "../basis/Button/RoundedButton";

interface OrderDetailsProps {
  selectedOrder?: Order | null;
  onUpdateStatus: (status: OrderStatus) => void;
}

const OrderButton = ({ selectedOrder, onUpdateStatus }: OrderDetailsProps) => {
  switch (selectedOrder?.status) {
    case OrderStatus.picking:
      return (
        <RoundedButton
          onClick={() => onUpdateStatus(OrderStatus.sent)}
          style={{ width: "100%", backgroundColor: "green" }}
        >
          Alterar para saiu para entrega
        </RoundedButton>
      );
    case OrderStatus.sent:
      return (
        <RoundedButton
          onClick={() => onUpdateStatus(OrderStatus.delivered)}
          style={{ width: "100%", backgroundColor: "orange" }}
          color="orange"
        >
          Alterar para pedido entregue
        </RoundedButton>
      );
    case OrderStatus.delivered:
      return (
        <RoundedButton
          onClick={window.print}
          style={{ width: "100%", backgroundColor: "blue" }}
          color="blue"
        >
          Imprimir
        </RoundedButton>
      );
  }
};

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

  return (
    <>
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

      <div style={{ marginTop: "2rem" }}>
        <OrderButton
          onUpdateStatus={onUpdateStatus}
          selectedOrder={selectedOrder}
        />
      </div>
    </>
  );
}
