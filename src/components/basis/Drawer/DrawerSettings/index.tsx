import Drawer from "@mui/material/Drawer/Drawer";
import {
  drawerCloseButtonMobile,
  drawerContentContainer,
  drawerFooter,
  drawerSettingsContent,
} from "./style.css";
import { PropsWithChildren, ReactNode } from "react";
import { IconButton } from "@mui/material";
import Image from "next/image";
import DrawerHeader from "./drawerHeader";

interface DrawerSettingsProps {
  open: boolean;
  onClose: () => void;
  footerTile: ReactNode;
}

export default function DrawerSettings({
  open,
  onClose,
  children,
  footerTile,
}: PropsWithChildren<DrawerSettingsProps>) {
  return (
    <Drawer open={open} onClose={onClose}>
      <div className={drawerContentContainer}>
        <div className={drawerSettingsContent}>
          <DrawerHeader onClose={onClose}>Olá, Fulaninho</DrawerHeader>
          {children}
          <div className={drawerFooter}>{footerTile}</div>
        </div>
      </div>
    </Drawer>
  );
}
