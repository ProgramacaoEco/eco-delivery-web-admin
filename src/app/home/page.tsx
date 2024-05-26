"use client";

import Card from "@/components/basis/Card";
import { themeVars } from "@/theme/theme.css";
import { homeContainer, homeGrid, homeHeader } from "./style.css";
import Image from "next/image";

import SettingsButton from "@/components/basis/Button/SettingsButton";
import { useState } from "react";

import DrawerSettings from "@/components/basis/Drawer/DrawerSettings";
import DrawerTile from "@/components/basis/Drawer/DrawerSettings/drawerTile";
import StoreSwitch from "@/components/basis/StoreSwitch";

export default function Page() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <div className={homeContainer}>
        <div className={homeGrid}>
          <div className={homeHeader}>
            <SettingsButton onClick={() => setOpenDrawer(true)} />
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
            iconUrl="icons/assignment.svg"
            label="Pedidos"
          />
          <Card
            shadow={themeVars.shadow.shadowBlue}
            iconUrl="icons/assignment_check.svg"
            label="Pedidos faturados"
          />
          <Card
            shadow={themeVars.shadow.shadowOrange}
            iconUrl="icons/liquor.svg"
            label="Produtos"
          />
          <Card
            shadow={themeVars.shadow.shadowOrange}
            iconUrl="icons/warehouse.svg"
            label="Estoque"
          />
          <Card
            shadow={themeVars.shadow.shadowLightBlue}
            iconUrl="icons/local_shipping.svg"
            label="Bairros"
          />
          <Card
            shadow={themeVars.shadow.shadowWhite}
            iconUrl="icons/campaign.svg"
            label="Campanhas"
          />
        </div>
      </div>
      <DrawerSettings
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        footerTile={
          <DrawerTile
            href="#"
            iconUrl="/icons/logout.svg"
            label="Sair do sistema"
          />
        }
      >
        <DrawerTile href="#" iconUrl="/icons/person.svg" label="Usuários" />
        <DrawerTile href="#" iconUrl="/icons/report.svg" label="Relatórios" />
      </DrawerSettings>
    </>
  );
}
