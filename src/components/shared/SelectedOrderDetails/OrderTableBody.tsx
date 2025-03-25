import "./style.css";

import Item from "@/helpers/realtime/model/order/item";
import Order from "@/helpers/realtime/model/order/order";

interface OrderTableBodyProps {
  selectedOrder?: Order | null;
}

export default function OrderTableBody({ selectedOrder }: OrderTableBodyProps) {
  return (
    <tbody>
      {selectedOrder?.items?.map(
        ({ id, product, quantity, value, notes }: Item) => (
          <tr key={product.id}>
            <td scope="row" data-label="Cód">
              {id}
            </td>
            <td scope="row" data-label="Descrição">
              {product.description}
            </td>
            <td scope="row" data-label="Quantidade">
              {quantity}
            </td>
            <td scope="row" data-label="Preço">
              R$
              {(quantity * value).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
            <td scope="row" data-label="Obs.">
              {notes}
            </td>
          </tr>
        )
      )}
    </tbody>
  );
}
