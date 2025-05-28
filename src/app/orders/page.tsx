"use client";

import { useContext, useEffect } from "react";

import Link from "next/link";
import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import { OrderContext } from "./context/OrderContext";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import Tile from "@/components/basis/Tile";
import useOrders from "./hooks/useOrders";

export default function Orders() {
  const { loading, error, orders, storeStatus, getStoreStatus } =
    useContext(OrderContext);
  const { listenToOrders } = useOrders();

  useEffect(() => {
    listenToOrders(storeStatus);
    getStoreStatus();
  }, [listenToOrders, storeStatus, getStoreStatus]);

  return (
    <>
      <PageTitle isLoading={loading} title="Pedidos" />
      <LoadingContainer
        loading={loading || storeStatus === undefined}
        error={error !== undefined}
        isEmpty={orders === undefined || orders?.length <= 0}
        emptyMessage={
          storeStatus === false
            ? "A loja está fechada. Abra a loja para ver os pedidos."
            : orders === undefined || orders.length <= 0
            ? "Não há pedidos em andamento"
            : undefined
        }
      >
        {orders && (
          <>
            <ListTile>
              {orders
                .sort((a, b) => b.createdOn.getTime() - a.createdOn.getTime())
                .map(({ orderIssuer, id, createdOn, isViewed, address }) => (
                  <Link key={id} href={`/orders/${id}`}>
                    <Tile isDeletable={false} isNewOrder={!isViewed}>
                      {createdOn?.toLocaleDateString("pt-BR")}{" "}
                      {createdOn?.toLocaleTimeString("pt-BR")} - {orderIssuer}
                      {!address && (
                        <span style={{ color: "orange", fontWeight: "bold" }}>
                          <span style={{ color: "white" }}> - </span>RETIRADA
                        </span>
                      )}
                    </Tile>
                  </Link>
                ))}
            </ListTile>
          </>
        )}
      </LoadingContainer>
    </>
  );
}
