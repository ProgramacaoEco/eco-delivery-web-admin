"use client"

import OrderCard from "@/components/basis/OrderCard";
import PageTitle from "@/components/basis/PageTitle/PageTitle";

export default function Faturados() {
  return (
    <div>
      <PageTitle color="blue" title="Pedidos faturados" />
      <OrderCard/>
    </div>
  );
}
