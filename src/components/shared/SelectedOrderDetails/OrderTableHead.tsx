import "./style.css";

import { themeVars } from "@/theme/theme.css";

export default function OrderTableHead() {
  return (
    <thead>
      <tr>
        <th scope="col" style={{ color: themeVars.color.background }}>
          Cód.
        </th>
        <th scope="col" style={{ color: themeVars.color.background }}>
          Descrição
        </th>
        <th scope="col" style={{ color: themeVars.color.background }}>
          Qtd.
        </th>
        <th scope="col" style={{ color: themeVars.color.background }}>
          Valor
        </th>
        <th scope="col" style={{ color: themeVars.color.background }}>
          Obs.
        </th>
      </tr>
    </thead>
  );
}
