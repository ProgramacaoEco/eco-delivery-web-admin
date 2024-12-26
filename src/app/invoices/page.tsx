"use client";

import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import Tile from "@/components/basis/Tile";
import Order from "@/helpers/firestore/model/order/order";
import Link from "next/link";
import { useEffect } from "react";
import useInvoices from "./hooks/useInvoices";

export default function Invoiced() {
  useEffect(() => {
    getInvoices();
    console.log(error !== null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getInvoices, error, loading, orders } = useInvoices();

  return (
    <div>
      <PageTitle color="blue" title="Pedidos faturados" />
      <LoadingContainer loading={loading} error={error !== null}>
        <ListTile>
          {orders.map(({ orderIssuer, _id, createdOn }: Order) => (
            <Link key={_id} href={`/invoiced/${_id}`}>
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
