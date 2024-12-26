"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import Order from "@/helpers/firestore/model/order/order";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import Tile from "@/components/basis/Tile";
import useOrders from "./hooks/useOrders";

export default function Orders() {
  const { listenToOrders, error, loading, orders } = useOrders();

  useEffect(() => {
    listenToOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
