"use client";

import { useContext, useEffect } from "react";

import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import Tile from "@/components/basis/Tile";
import Link from "next/link";
import { OrderContext } from "./context/OrderContext";
import useOrders from "./hooks/useOrders";

export default function Orders() {
  const { loading, error, orders, storeStatus } = useContext(OrderContext);
  const { listenToOrders } = useOrders();

  useEffect(() => {
    listenToOrders(storeStatus);
  }, [listenToOrders, storeStatus]);

  return (
    <>
      <PageTitle isLoading={loading} color="blue" title="Pedidos" />
      <LoadingContainer
        loading={loading || (storeStatus ?? false)}
        error={error !== undefined}
        isEmpty={orders === undefined || orders?.length <= 0}
        emptyMessage={
          storeStatus && (orders === undefined || orders.length <= 0)
            ? "Não há pedidos em andamento"
            : "A loja está fechada. Abra a loja para ver os pedidos."
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
