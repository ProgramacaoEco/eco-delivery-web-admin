import Item from "@/helpers/realtime/model/order/item";
import Order from "@/helpers/realtime/model/order/order";
import { OrderStatus } from "@/helpers/realtime/enum/order-status";
import RoundedButton from "../basis/Button/RoundedButton";
import { themeVars } from "@/theme/theme.css";
import { useEffect } from "react";

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
          {selectedOrder?.address.neighborhood.neighborhoodName},{" "}
          {selectedOrder?.address.postalCode}
        </h3>
        <h3>{selectedOrder?.address.reference}</h3>
      </div>

      <table
        style={{
          width: "100%",
          marginTop: "2rem",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "lightblue",
            }}
          >
            <td style={{ color: themeVars.color.background }} colSpan={1}>
              Cód.
            </td>
            <td style={{ color: themeVars.color.background }} colSpan={2}>
              Descrição
            </td>
            <td style={{ color: themeVars.color.background }} colSpan={2}>
              Qtd.
            </td>
            <td style={{ color: themeVars.color.background }} colSpan={2}>
              Valor
            </td>
            <td style={{ color: themeVars.color.background }} colSpan={2}>
              Obs.
            </td>
          </tr>
        </thead>
        <tbody>
          {selectedOrder?.items?.map(
            ({ id, product, quantity, value, notes }: Item) => (
              <tr key={product.id}>
                <td colSpan={1}>{id}</td>
                <td colSpan={2}>{product.description}</td>
                <td colSpan={2}>{quantity}</td>
                <td colSpan={2}>
                  R$
                  {(quantity * value).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td colSpan={2}>{notes}</td>
              </tr>
            )
          )}
          <tr key="freight-cost">
            <td
              colSpan={5}
              style={{
                backgroundColor: "lightblue",
                color: themeVars.color.background,
              }}
            >
              Entrega
            </td>
            <td
              colSpan={4}
              style={{
                backgroundColor: "lightblue",
                color: themeVars.color.background,
              }}
            >
              R$
              {(
                selectedOrder?.address.neighborhood.freightCost ?? 0
              ).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
          </tr>
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
            <td colSpan={5}>
              R$
              {selectedOrder?.items
                ?.reduce(
                  (accumulator: number, currentValue: Item) =>
                    accumulator + currentValue.value * currentValue.quantity,
                  selectedOrder?.address.neighborhood.freightCost ?? 0
                )
                .toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </td>
          </tr>
          <tr>
            <td colSpan={5}>Forma de pagamento</td>
            <td colSpan={4}>{selectedOrder?.paymentMethod}</td>
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
