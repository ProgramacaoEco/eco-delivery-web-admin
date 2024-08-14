"use client";

import OrderCard from "@/components/basis/OrderCard";
import OrderSlider from "@/components/basis/OrderSlider";
import PageTitle from "@/components/basis/PageTitle/PageTitle";

export default function Invoiced() {
  return (
    <div>
      <PageTitle color="blue" title="Pedidos faturados" />
      <OrderSlider>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </OrderSlider>
    </div>
  );
}
