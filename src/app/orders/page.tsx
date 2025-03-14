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
  const { loading, error, orders } = useContext(OrderContext);
  const { getOrders } = useOrders();

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <PageTitle isLoading={loading} color="blue" title="Pedidos" />
      <LoadingContainer loading={loading} error={error !== undefined}>
        {orders && (
          <>
            <ListTile>
              {orders.map(({ orderIssuer, id, createdOn }) => (
                <Link key={id} href={`/orders/${id}`}>
                  <Tile isDeletable={false}>
                    {createdOn?.toLocaleDateString("pt-BR")}{" "}
                    {createdOn?.toLocaleTimeString("pt-BR")} - {orderIssuer}
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
