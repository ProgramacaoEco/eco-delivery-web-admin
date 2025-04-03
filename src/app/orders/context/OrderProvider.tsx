import { PropsWithChildren, useEffect, useMemo, useState } from "react";

import Order from "@/helpers/realtime/model/order/order";
import useStoreStatus from "@/hooks/useStoreStatus";
import { Howl } from "howler";
import toast from "react-hot-toast";
import { OrderContext } from "./OrderContext";

export default function OrderProvider({ children }: PropsWithChildren) {
  const [orders, setOrders] = useState<Order[] | undefined>(undefined);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { storeStatus, listenToStoreStatus } = useStoreStatus();

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
    listenToStoreStatus();
  }, [listenToStoreStatus]);

  useEffect(() => {
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
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
