import React, { ComponentProps, PropsWithChildren } from "react";
import {
  orderTable,
  orderTableDivider,
  tableContainer,
  tableData,
  tableDataCode,
  tableDataDescription,
  tableDataDivider,
} from "./style.css";

import { Typography } from "../../Typography";
import { cn } from "@/utils/classNames";

type OrderTableType = {
  code: string;
  description: string;
  quantity: number;
};

interface OrderTableProps {
  items: OrderTableType[];
}

const OrderTableBody = ({ items }: OrderTableProps) => {
  return (
    <tbody style={{ textAlign: "start" }}>
      {items.map((props) => (
        <TableRowBody key={props.code} {...props} />
      ))}
    </tbody>
  );
};

const OrderTableHeader = () => {
  return (
    <thead style={{ textAlign: "start" }}>
      <tr>
        <TableData>Cód</TableData>
        <TableData>Descrição</TableData>
        <TableData style={{ textAlign: "end" }}>Qtd.</TableData>
      </tr>
    </thead>
  );
};

const OrderTableDivider = () => <div className={orderTableDivider} />;

const TableData = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"td">>) => {
  return (
    <td {...props}>
      <Typography.DisplayMediumBold className={cn(tableData, className)}>
        {children}
      </Typography.DisplayMediumBold>
      <div className={tableDataDivider} />
    </td>
  );
};

const TableRowBody = ({ code, description, quantity }: OrderTableType) => {
  return (
    <tr>
      <TableData className={tableDataCode}>{code}</TableData>
      <TableData className={tableDataDescription}>{description}</TableData>
      <TableData style={{ textAlign: "end" }}>{quantity}</TableData>
    </tr>
  );
};

export default function OrderTable({ items }: OrderTableProps) {
  return (
    <>
      <OrderTableDivider />
      <Typography.TitleBold>Itens do pedido</Typography.TitleBold>
      <OrderTableDivider />
      <div className={tableContainer}>
        <table className={orderTable}>
          <OrderTableHeader />
          <OrderTableBody items={items} />
        </table>
      </div>
    </>
  );
}
