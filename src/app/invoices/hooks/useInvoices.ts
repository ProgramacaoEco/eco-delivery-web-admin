import { useCallback, useState } from "react";

import { Collections } from "@/helpers/firestore/collections";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";
import Address from "@/helpers/realtime/model/order/address";
import Item from "@/helpers/realtime/model/order/item";
import Order from "@/helpers/realtime/model/order/order";
import { errorMessage } from "@/utils/texts";

export default function useInvoices() {
  const { get, getBy } = useFirebase<Order>();

  const [error, setError] = useState<string | undefined>(undefined);
  const [orders, setOrders] = useState<Order[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const collection = Collections.Pedidos_Faturados;

  const transformer = (data: any) =>
    new Order(
      data?.id,
      data?.orderIssuer,
      new Address(
        data?.address.address,
        data?.address.number,
        data?.address.apt,
        data?.address.neighborhood,
        data?.address.reference,
        data?.address.postalCode
      ),
      data?.items.map(
        (content: any) =>
          new Item(
            content.id,
            content.description,
            content.quantity,
            content.value
          )
      ),
      data?.phoneNumber,
      new Date(data?.createdOn),
      data.status
    );

  const getInvoices = useCallback(() => {
    setError(undefined);
    setLoading(true);
    get({
      collection,
      onData: (orders) => {
        setOrders(orders);
        setLoading(false);
      },
      onError: () => {
        setError(errorMessage("ao obter os pedidos faturados."));
        setLoading(false);
      },
      transformer,
    });
  }, [collection, get]);

  const getInvoice = useCallback(
    (id: string) => {
      setError(undefined);
      setLoading(true);
      getBy({
        collection,
        id,
        onData: (order) => {
          setSelectedOrder(order);
          setLoading(false);
        },
        onError: () => {
          setError(errorMessage("ao obter o pedido faturado selecionado."));
          setLoading(false);
        },
        transformer,
      });
    },
    [collection, getBy]
  );

  return { getInvoice, getInvoices, orders, error, loading, selectedOrder };
}
