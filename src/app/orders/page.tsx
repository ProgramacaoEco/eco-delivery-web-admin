"use client";

import Link from "next/link";
import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import { OrderContext } from "./context/OrderContext";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import Tile from "@/components/basis/Tile";
import { useContext } from "react";

export default function Orders() {
  const { loading, error, orders } = useContext(OrderContext);

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
