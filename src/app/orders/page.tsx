"use client";
import { useEffect } from "react";

import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import Tile from "@/components/basis/Tile";
import Link from "next/link";
import useOrders from "./hooks/useOrders";

export default function Orders() {
  const { listenToOrders, error, loading, orders } = useOrders();

  useEffect(() => {
    listenToOrders();
  }, [listenToOrders]);

  return (
    <div>
      <PageTitle color="blue" title="Pedidos" />
      <LoadingContainer loading={loading} error={error !== null}>
        <ListTile>
          {orders.map(({ orderIssuer, _id, createdOn }) => (
            <Link key={_id} href={`/orders/${_id}`}>
              <Tile isDeletable={false}>
                {createdOn?.toLocaleDateString("pt-BR")}{" "}
                {createdOn?.toLocaleTimeString("pt-BR")} - {orderIssuer}
              </Tile>
            </Link>
          ))}
        </ListTile>
      </LoadingContainer>
    </div>
  );
}
