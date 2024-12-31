import { PropsWithChildren, useState } from "react";

import Order from "@/helpers/realtime/model/order/order";
import { OrderContext } from "./OrderContext";

export default function OrderProvider({ children }: PropsWithChildren) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <OrderContext.Provider
      value={{
        loading,
        orders,
        setError,
        setLoading,
        setOrders,
        setSelectedOrder,
        error,
        selectedOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
