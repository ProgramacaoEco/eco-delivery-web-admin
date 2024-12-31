import { OrderContextType } from "./OrderContextType";
import { createContext } from "react";

export const OrderContext = createContext<OrderContextType>({
  loading: false,
  orders: [],
  setError: () => {},
  setLoading: () => {},
  setOrders: () => {},
  setSelectedOrder: () => {},
});
