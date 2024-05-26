import { PropsWithChildren } from "react";
import { drawerHeader, drawerHeaderCloseButton } from "./style.css";
import IconButton from "@mui/material/IconButton/IconButton";
import Image from "next/image";

interface DrawerHeaderProps {
  onClose: () => void;
}

export default function DrawerHeader({
  children,
  onClose,
}: PropsWithChildren<DrawerHeaderProps>) {
  return (
    <div className={drawerHeader}>
      <div>{children}</div>{" "}
      <IconButton
        color="primary"
        className={drawerHeaderCloseButton}
        onClick={onClose}
      >
        <Image
          src="/icons/close.svg"
          width={48}
          height={48}
          alt="Fechar"
          draggable={false}
        />
      </IconButton>
    </div>
  );
}
