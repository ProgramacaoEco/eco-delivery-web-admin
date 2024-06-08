"use client";

import {
  Assignment,
  AssignmentCheck,
  Campaign,
  Liquor,
  LocalShipping,
  Logout,
  Person,
  Report,
  Settings,
  Warehouse,
} from "@icons/index";
import { homeContainer, homeGrid, homeHeader } from "./style.css";

import Card from "@/components/basis/Card";
import DrawerSettings from "@/components/basis/Drawer/DrawerSettings";
import DrawerTile from "@/components/basis/Drawer/DrawerSettings/drawerTile";
import { IconButton } from "@mui/material";
import Image from "next/image";
import StoreSwitch from "@/components/basis/StoreSwitch";
import { signOut } from "next-auth/react";
import { themeVars } from "@/theme/theme.css";
import { useState } from "react";

export default function Page() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <div className={homeContainer}>
        <div className={homeGrid}>
          <div className={homeHeader}>
            <IconButton onClick={() => setOpenDrawer(true)}>
              <Settings />
            </IconButton>
            <StoreSwitch />
            <Image
              src="/test_logo.png"
              width={75}
              height={75}
              alt="Test LOGO"
            />
          </div>
          <Card
            shadow={themeVars.shadow.shadowBlue}
            Icon={Assignment}
            label="Pedidos"
          />
          <Card
            shadow={themeVars.shadow.shadowBlue}
            Icon={AssignmentCheck}
            label="Pedidos faturados"
          />
          <Card
            shadow={themeVars.shadow.shadowOrange}
            Icon={Liquor}
            label="Produtos"
          />
          <Card
            shadow={themeVars.shadow.shadowOrange}
            Icon={Warehouse}
            label="Estoque"
          />
          <Card
            shadow={themeVars.shadow.shadowLightBlue}
            Icon={LocalShipping}
            label="Bairros"
          />
          <Card
            shadow={themeVars.shadow.shadowWhite}
            Icon={Campaign}
            label="Campanhas"
          />
        </div>
      </div>
      <DrawerSettings
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        footerTile={
          <DrawerTile
            type="button"
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
            Icon={Logout}
            label="Sair do sistema"
          />
        }
      >
        <DrawerTile type="link" href="/users" Icon={Person} label="Usuários" />
        <DrawerTile type="link" href="#" Icon={Report} label="Relatórios" />
      </DrawerSettings>
    </>
  );
}
