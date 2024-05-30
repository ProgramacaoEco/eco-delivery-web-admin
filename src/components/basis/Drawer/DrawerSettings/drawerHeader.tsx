import { drawerHeader, drawerHeaderCloseButton } from "./style.css";

import { Close } from "@icons/index";
import IconButton from "@mui/material/IconButton/IconButton";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { Typography } from "../../Typography";

interface DrawerHeaderProps {
  onClose: () => void;
}

export default function DrawerHeader({
  children,
  onClose,
}: PropsWithChildren<DrawerHeaderProps>) {
  return (
    <div className={drawerHeader}>
      <Typography.TitleBold>{children}</Typography.TitleBold>{" "}
      <IconButton
        color="primary"
        className={drawerHeaderCloseButton}
        onClick={onClose}
      >
        <Close fontSize={36} />
      </IconButton>
    </div>
  );
}
