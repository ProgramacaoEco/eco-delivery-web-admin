import "@egjs/react-flicking/dist/flicking.css";

import OrderHeader from "./OrderHeader";
import OrderTable from "./OrderTable";
import RoundedButton from "../Button/RoundedButton";
import { cn } from "@/utils/classNames";
import { orderCard } from "./style.css";

export default function OrderCard() {
  return (
    <article className={cn(orderCard, "panel")}>
      <OrderHeader />
      <OrderTable
        items={[
          {
            code: "6728027123456",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
          {
            code: "6728027",
            description: "CERVEJA STELLA ARTOIS 473ML",
            quantity: 100,
          },
        ]}
      />
      <RoundedButton style={{ margin: "0px 20px", backgroundColor: "blue" }}>
        Imprimir
      </RoundedButton>
    </article>
  );
}
