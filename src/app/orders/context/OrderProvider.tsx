import { PropsWithChildren, useEffect, useMemo, useState } from "react";

import { Howl } from "howler";
import Order from "@/helpers/firestore/model/order/order";
import { OrderContext } from "./OrderContext";
import { auth } from "@/firebase-config";
import toast from "react-hot-toast";
import useStoreStatus from "@/hooks/useStoreStatus";

export default function OrderProvider({ children }: PropsWithChildren) {
  const [orders, setOrders] = useState<Order[] | undefined>(undefined);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { storeStatus, listenToStoreStatus, getStoreStatus } = useStoreStatus();

  const notificationSound = useMemo(
    () =>
      new Howl({
        src: ["/sound/notification.mp3"],
        html5: true,
        autoplay: true,
        loop: true,
      }),
    []
  );

  useEffect(() => {
    if (!auth.currentUser) return;

    listenToStoreStatus();
  }, [listenToStoreStatus]);

  useEffect(() => {
    if (!auth.currentUser) return;

    toast.dismiss();

    if (orders === undefined) return;

    const orderQuantity = orders.filter((o) => !o.isViewed).length;

    if (orders && orderQuantity && orderQuantity > 0) {
      toast.success(
        `Você tem ${orderQuantity} ${
          orderQuantity > 1 ? "novos pedidos" : "novo pedido"
        }`
      );
    }
  }, [orders]);

  useEffect(() => {
    if (orders?.some((o: Order) => !o.isViewed)) {
      if (!notificationSound.playing()) {
        notificationSound.load();
        notificationSound.play();
      }
    } else {
      notificationSound.unload();
      notificationSound.stop();
    }
  }, [notificationSound, orders]);

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
        storeStatus: storeStatus?.storeStatus,
        selectedOrder,
        getStoreStatus: getStoreStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
