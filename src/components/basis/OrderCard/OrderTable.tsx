import React from "react";
import { Typography } from "../Typography";

type OrderTableType = {
  code: string;
  description: string;
  quantity: number;
};

interface OrderTableProps {
  items: OrderTableType[];
}

const TableData = ({
  content,
  style,
}: {
  content: string | number;
  style?: React.CSSProperties;
}) => {
  return (
    <td>
      <div style={{ padding: "20px 20px" }}>
        <Typography.DisplayMediumBold>{content}</Typography.DisplayMediumBold>
      </div>
      <div
        style={{ width: "100%", backgroundColor: "white", height: "1px" }}
      ></div>
    </td>
  );
};

const TableRowBody = ({ code, description, quantity }: OrderTableType) => {
  return (
    <tr>
      <TableData content={code} />
      <TableData content={description} />
      <TableData content={quantity} style={{ textAlign: "end" }} />
    </tr>
  );
};

export default function OrderTable({ items }: OrderTableProps) {
  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <div
          style={{ width: "100%", backgroundColor: "white", height: "2px" }}
        ></div>
        <div style={{ padding: "20px 0" }}>
          <Typography.TitleBold>Itens do pedido</Typography.TitleBold>
        </div>
        <div
          style={{ width: "100%", backgroundColor: "white", height: "2px" }}
        ></div>
      </div>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          alignSelf: "center",
        }}
      >
        <thead style={{ textAlign: "start" }}>
          <tr>
            <td colSpan={1}>
              <div style={{ padding: "0px 20px" }}>
                <Typography.DisplayMediumBold>Cód</Typography.DisplayMediumBold>
              </div>
            </td>
            <td colSpan={1}>
              <div style={{ padding: "0px 20px" }}>
                <Typography.DisplayMediumBold>
                  Descrição
                </Typography.DisplayMediumBold>
              </div>
            </td>
            <td colSpan={2}>
              <div style={{ padding: "0px 20px" }}>
                <Typography.DisplayMediumBold>
                  Qtd.
                </Typography.DisplayMediumBold>
              </div>
            </td>
          </tr>
        </thead>
        <tbody style={{ textAlign: "start" }}>
          {items.map((props) => (
            <TableRowBody key={props.code} {...props} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
