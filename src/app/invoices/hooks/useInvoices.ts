import { Collections } from "@/helpers/firestore/collections";
import Address from "@/helpers/firestore/model/order/address";
import Item from "@/helpers/firestore/model/order/item";
import Order from "@/helpers/firestore/model/order/order";
import useFirebase from "@/helpers/hooks/useFirebase";
import { errorMessage } from "@/utils/texts";
import { useState } from "react";

export default function useInvoices() {
  const { get, getBy } = useFirebase<Order>();

  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
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
      new Date(data?.createdOn)
    );

  const getInvoices = () =>
    get({
      collection,
      onData: setOrders,
      onError: () => setError(errorMessage("ao obter os pedidos faturados.")),
      onLoading: setLoading,
      transformer,
    });

  const getInvoice = (id: string) =>
    getBy({
      collection,
      id,
      onData: setSelectedOrder,
      onError: () =>
        setError(errorMessage("ao obter o pedido faturado selecionado.")),
      onLoading: setLoading,
      transformer,
    });

  return { getInvoice, getInvoices, orders, error, loading, selectedOrder };
}
