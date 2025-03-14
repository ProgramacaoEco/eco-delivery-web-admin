import { tile, tileContainer } from "./style.css";

import Delete from "@icons/Delete";
import { Edit } from "@icons/index";
import { IconButton } from "@mui/material";
import { PropsWithChildren } from "react";

interface TileProps {
  isDeletable?: boolean;
  isEditable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function Tile({
  children,
  isDeletable = true,
  isEditable = false,
  onEdit,
  onDelete,
}: PropsWithChildren<TileProps>) {
  return (
    <div
      onClick={onEdit}
      style={{ cursor: onEdit ? "pointer" : "default" }}
      className={tileContainer}
    >
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
        </div>
      </div>
    </div>
  );
}
