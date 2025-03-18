import { newOrderBadge, tile } from "./style.css";

import Delete from "@icons/Delete";
import { Edit } from "@icons/index";
import { IconButton } from "@mui/material";
import { PropsWithChildren } from "react";

interface TileProps {
  isDeletable?: boolean;
  isEditable?: boolean;
  isNewOrder?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function Tile({
  children,
  isDeletable = true,
  isEditable = false,
  isNewOrder = false,
  onEdit,
  onDelete,
}: PropsWithChildren<TileProps>) {
  return (
    <div>
      <div className={tile}>
        <div>{children}</div>
        <div>
          {isEditable && (
            <IconButton onClick={onEdit}>
              <Edit />
            </IconButton>
          )}
          {isDeletable && (
            <IconButton
              style={{ visibility: isDeletable ? "visible" : "hidden" }}
              onClick={onDelete}
            >
              <Delete />
            </IconButton>
          )}
          {isNewOrder && <div className={newOrderBadge}>Novo pedido!</div>}
        </div>
      </div>
    </div>
  );
}
