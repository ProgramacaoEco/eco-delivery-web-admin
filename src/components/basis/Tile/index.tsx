import Delete from "@icons/Delete";
import { PropsWithChildren } from "react";
import { themeVars } from "@/theme/theme.css";
import { tile } from "./style.css";

interface TileProps {
  count: number;
}

export default function Tile({
  children,
  count,
}: PropsWithChildren<TileProps>) {
  const tileColor =
    count % 2 ? themeVars.color.tileEven : themeVars.color.tileOdd;

  return (
    <div>
      <div style={{ backgroundColor: tileColor }} className={tile}>
        {children}
        <Delete />
      </div>
    </div>
  );
}
