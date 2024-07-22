import OrderHeader from "./OrderHeader";
import OrderTable from "./OrderTable";
import RoundedButton from "../Button/RoundedButton";
import { themeVars } from "@/theme/theme.css";

export default function OrderCard() {
  return (
    <article
      style={{
        width: "50%",
        borderRadius: "25px",
        border: "1px solid white",
        height: "750px",
        backgroundColor: themeVars.color.faturados.orderCard,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "space-around",
      }}
    >
      <OrderHeader />
      <OrderTable
        items={[
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
