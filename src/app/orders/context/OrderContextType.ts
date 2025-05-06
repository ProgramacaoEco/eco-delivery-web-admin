import { Dispatch, SetStateAction } from "react";

import Order from "@/helpers/firestore/model/order/order";

export type OrderContextType = {
  orders?: Order[] | undefined;
  selectedOrder?: Order;
  storeStatus?: boolean;
  loading: boolean;
  error?: string;
  setError: Dispatch<SetStateAction<string | undefined>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setOrders: Dispatch<SetStateAction<Order[] | undefined>>;
  setSelectedOrder: Dispatch<SetStateAction<Order | undefined>>;
  getStoreStatus: () => void;
};
