import { PropsWithChildren, ReactNode } from "react";
import {
  drawerContentContainer,
  drawerFooter,
  drawerSettingsContent,
} from "./style.css";

import Drawer from "@mui/material/Drawer/Drawer";
import DrawerHeader from "./drawerHeader";
import { Typography } from "../../Typography";
import { themeVars } from "@/theme/theme.css";

interface DrawerSettingsProps {
  open: boolean;
  onClose: () => void;
  userLogged: string;
  footerTile: ReactNode;
}

export default function DrawerSettings({
  open,
  userLogged,
  onClose,
  children,
  footerTile,
}: PropsWithChildren<DrawerSettingsProps>) {
  return (
    <Drawer open={open} onClose={onClose}>
      <div className={drawerContentContainer}>
        <div className={drawerSettingsContent}>
          <DrawerHeader onClose={onClose}>Olá, {userLogged}</DrawerHeader>
          {children}
          <Typography.DisplayLargeRegular
            color={themeVars.color.background}
            className={drawerFooter}
          >
            {footerTile}
          </Typography.DisplayLargeRegular>
        </div>
      </div>
    </Drawer>
  );
}
