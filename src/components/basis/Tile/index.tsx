import Delete from "@icons/Delete";
import { IconButton } from "@mui/material";
import { PropsWithChildren } from "react";
import { themeVars } from "@/theme/theme.css";
import { tile } from "./style.css";

interface TileProps {
  count: number;
  isDeletable?: boolean;
  isEditable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function Tile({
  children,
  count,
  isDeletable = true,
  isEditable = false,
  onEdit,
  onDelete,
}: PropsWithChildren<TileProps>) {
  const tileColor =
    count % 2 ? themeVars.color.tileEven : themeVars.color.tileOdd;

  return (
    <div>
      <div style={{ backgroundColor: tileColor }} className={tile}>
        {children}
        {isEditable && <IconButton onClick={onEdit}></IconButton>}
        {
          <IconButton
            style={{ visibility: isDeletable ? "visible" : "hidden" }}
            onClick={onDelete}
          >
            <Delete />
          </IconButton>
        }
      </div>
    </div>
  );
}
