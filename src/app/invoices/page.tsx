"use client";

import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import Tile from "@/components/basis/Tile";
import Order from "@/helpers/realtime/model/order/order";
import Link from "next/link";
import { useEffect } from "react";
import useInvoices from "./hooks/useInvoices";

export default function Invoiced() {
  const { getInvoices, error, loading, orders } = useInvoices();

  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  return (
    <div>
      <PageTitle color="blue" title="Pedidos faturados" />
      <LoadingContainer loading={loading} error={error !== null}>
        <ListTile>
          {orders.map(({ orderIssuer, _id, createdOn }: Order) => (
            <Link key={_id} href={`/invoices/${_id}`}>
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
