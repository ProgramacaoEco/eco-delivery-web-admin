import Order from "@/helpers/realtime/model/order/order";
import { orderHeader } from "./style.css";

interface OrderHeaderProps {
  selectedOrder?: Order | null;
}

export default function OrderHeader({ selectedOrder }: OrderHeaderProps) {
  return (
    <caption className={orderHeader}>
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
    </caption>
  );
}
