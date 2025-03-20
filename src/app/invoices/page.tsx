"use client";

import { useEffect, useState } from "react";

import InputText from "@/components/basis/InputText/InputText";
import ListTile from "@/components/basis/ListTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import PageTitle from "@/components/basis/PageTitle/PageTitle";
import Tile from "@/components/basis/Tile";
import Order from "@/helpers/realtime/model/order/order";
import Link from "next/link";
import useInvoices from "./hooks/useInvoices";

export default function Invoiced() {
  const { getInvoices, error, loading, orders } = useInvoices();

  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  const [search, setSearch] = useState("");

  const filteredOrders = orders?.filter((o) =>
    o.orderIssuer.toUpperCase().includes(search.toUpperCase())
  );

  return (
    <>
      <PageTitle isLoading={loading} color="blue" title="Pedidos faturados" />
      <div
        style={{
          padding: "1rem",
          zIndex: 10,
          width: "100%",
          backgroundColor: "GrayText",
          position: "sticky",
          top: 0,
          borderRadius: "10px",
        }}
      >
        <InputText
          label="Pesquisar por nome do cliente"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <LoadingContainer loading={loading} error={error !== undefined}>
        {orders && (
          <ListTile>
            {filteredOrders?.map(({ orderIssuer, id, createdOn }: Order) => (
              <Link key={id} href={`/invoices/${id}`}>
                <Tile isDeletable={false}>
                  {createdOn?.toLocaleDateString("pt-BR")}{" "}
                  {createdOn?.toLocaleTimeString("pt-BR")} - {orderIssuer}
                </Tile>
              </Link>
            ))}
          </ListTile>
        )}
      </LoadingContainer>
    </>
  );
}
