import Address from "@/helpers/firestore/model/order/address";
import Item from "@/helpers/firestore/model/order/item";
import Order from "@/helpers/firestore/model/order/order";
import { References } from "@/helpers/realtime/references";
import { errorMessage } from "@/utils/texts";
import useRealtime from "@/helpers/hooks/useRealtime";
import { useState } from "react";

export default function useOrders() {
  const { getSingle, listenToValue } = useRealtime();

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = (data: any) =>
    new Order(
      data?.id,
      data?.orderIssuer,
      new Address(
        data?.address?.address,
        data?.address?.number,
        data?.address?.apt,
        data?.address?.neighborhood,
        data?.address?.reference,
        data?.address?.postalCode
      ),
      data?.items?.map(
        (content: any) =>
          new Item(
            content.id,
            content.description,
            content.quantity,
            content.value
          )
      ),
      data?.phoneNumber,
      new Date(data?.createdOn)
    );

  const getSingleOrder = (id: string) =>
    getSingle({
      id: id,
      onData: (data) => setSelectedOrder(createOrder(data)),
      onError: () => setError(errorMessage("ao obter o pedido selecionado")),
      onLoading: setLoading,
      reference: References.orders,
    });

  const listenToOrders = () =>
    listenToValue({
      onData: (data) => setOrders(data.map(createOrder)),
      onLoading: setLoading,
      onError: () => setError(errorMessage("ao obter os pedidos")),
      reference: References.orders,
    });

  return {
    getSingleOrder,
    listenToOrders,
    orders,
    selectedOrder,
    error,
    loading,
  };
}
