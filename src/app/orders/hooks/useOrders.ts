import { useCallback, useContext } from "react";

import Address from "@/helpers/realtime/model/order/address";
import { Category } from "@/helpers/firestore/model/product/category";
import { Collections } from "@/helpers/firestore/collections";
import Item from "@/helpers/realtime/model/order/item";
import Neighborhood from "@/helpers/firestore/model/neighborhood/neighborhood";
import Order from "@/helpers/realtime/model/order/order";
import { OrderContext } from "../context/OrderContext";
import { OrderStatus } from "@/helpers/realtime/enum/order-status";
import { Product } from "@/helpers/firestore/model/product/product";
import { References } from "@/helpers/realtime/references";
import { errorMessage } from "@/utils/texts";
import useFirebase from "@/helpers/firestore/hooks/useFirebase";
import useRealtime from "@/helpers/realtime/hooks/useRealtime";

export default function useOrders() {
  const { getSingle, listenToValue, setValue, deleteSingle, get } =
    useRealtime();
  const { set } = useFirebase();

  const { setError, setLoading, setOrders, setSelectedOrder, orders } =
    useContext(OrderContext);

  const createOrder = (
    data: any,
    isViewed: boolean = false,
    status?: OrderStatus
  ) =>
    new Order(
      data?.id,
      !isViewed ? data?.isViewed : isViewed,
      data?.orderIssuer,
      data.address
        ? new Address(
            data?.address?.address,
            data?.address?.number,
            data?.address?.apt,
            new Neighborhood(
              data?.address?.neighborhood.id,
              data?.address?.neighborhood.neighborhoodName,
              data?.address?.neighborhood.freightCost
            ),
            data?.address?.reference,
            data?.address?.postalCode
          )
        : null,
      data?.items?.map(
        (content: any) =>
          new Item(
            content.id,
            new Product(
              content.product.id,
              content.product.description,
              content.product.value,
              new Category(
                content.product.category.id,
                content.product.category.name,
                content.product.category.pictureUrl
              ),
              content.product.inventory,
              content.product.image
            ),
            content.quantity,
            content.value,
            content?.notes ?? ""
          )
      ),
      data?.phoneNumber,
      new Date(data?.createdOn),
      status === undefined ? data.status : status,
      data?.paymentMethod,
      data?.uidOrderIssuer
    );

  const getSingleOrder = useCallback(
    (id: string) => {
      setError(undefined);
      setLoading(true);
      getSingle({
        id: id,
        onData: (data) => {
          setSelectedOrder(createOrder(data));
          setLoading(false);
        },
        onError: () => {
          setError(errorMessage("ao obter o pedido selecionado"));
          setLoading(false);
        },
        reference: References.orders,
      });
    },
    [getSingle, setError, setLoading, setSelectedOrder]
  );

  const listenToOrders = useCallback(
    async (isStoreOpen?: boolean) => {
      if (isStoreOpen !== undefined) {
        if (!isStoreOpen) {
          setOrders([]);
          return;
        }

        setError(undefined);
        setLoading(true);
        return await listenToValue({
          onData: (data) => {
            setOrders(
              data.map((o: Order) => createOrder(o, o.isViewed, o.status))
            );
            setLoading(false);
          },
          onError: () => {
            setError(errorMessage("ao obter os pedidos"));
            setLoading(false);
          },
          reference: References.orders,
        });
      }
    },
    [listenToValue, setError, setLoading, setOrders]
  );

  const updateOrderStatus = useCallback(
    async (
      status: OrderStatus,
      order?: Order,
      onUpdate?: (data: any) => any
    ) => {
      setError(undefined);
      setLoading(true);
      if (order !== undefined) {
        await setValue({
          id: order.id,
          onData: async (data) => {
            const updatedOrder = createOrder(data);
            setSelectedOrder(updatedOrder);
            if (onUpdate) await onUpdate(updatedOrder);
            setLoading(false);
          },
          onError: () => {
            setError(errorMessage("ao atualizar o estado do pedido"));
            setLoading(false);
          },
          reference: References.orders,
          value: createOrder(order.toJson(), true, status),
        });
      } else {
        throw Error("Order cannot be null.");
      }
    },
    [setError, setLoading, setSelectedOrder, setValue]
  );

  const deleteOrder = useCallback(
    (id: string) => {
      deleteSingle({
        id,
        onError: () => setError(errorMessage("ao remover o pedido finalizado")),
        reference: References.orders,
      });
    },
    [deleteSingle, setError]
  );

  const setInvoice = useCallback(
    async (order: Order) => {
      setLoading(true);
      await set({
        collection: Collections.Pedidos_Faturados,
        body: order,
        onError: () => setError(errorMessage("ao faturar o pedido finalizado")),
        onSuccess: () => deleteOrder(order.id),
      });
      setLoading(false);
    },
    [deleteOrder, set, setError, setLoading]
  );

  return {
    updateOrderStatus,
    getSingleOrder,
    listenToOrders,
    deleteOrder,
    setInvoice,
  };
}
