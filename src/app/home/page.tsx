"use client";
import { app } from "@/firebase-config";
import useStoreStatus, { StoreStatus } from "@/hooks/useStoreStatus";
import {
  Assignment,
  AssignmentCheck,
  Campaign,
  Discount,
  Liquor,
  LocalShipping,
  Logout,
  Person,
  Report,
  Settings,
  ShoppingCart,
} from "@icons/index";
import {
  fetchAndActivate,
  getRemoteConfig,
  getString,
} from "firebase/remote-config";
import { useContext, useEffect, useState } from "react";
import { homeContainer, homeGrid, homeHeader } from "./style.css";

import Card from "@/components/basis/Card";
import DrawerSettings from "@/components/basis/Drawer/DrawerSettings";
import DrawerTile from "@/components/basis/Drawer/DrawerSettings/drawerTile";
import LoadingContainer from "@/components/basis/LoadingContainer";
import StoreSwitch from "@/components/basis/StoreSwitch";
import useAuth from "@/hooks/useAuth";
import { themeVars } from "@/theme/theme.css";
import { IconButton } from "@mui/material";
import Image from "next/image";
import { OrderContext } from "../orders/context/OrderContext";
import useOrders from "../orders/hooks/useOrders";

export default function Page() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { handleSignOut } = useAuth();

  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const remoteConfig = getRemoteConfig(app);
    fetchAndActivate(remoteConfig).then((_) => {
      const title = getString(remoteConfig, "title");
      const icon = getString(remoteConfig, "favicon");

      setIcon(icon);
      setTitle(title);
    });
  }, []);

  const { listenToOrders } = useOrders();
  const {
    changeStoreStatus,
    error: errorStoreStatus,
    getStoreStatus,
    loading: loadingStoreStatus,
    storeStatus,
  } = useStoreStatus();
  const { loading, error } = useContext(OrderContext);

  useEffect(() => {
    listenToOrders(storeStatus?.storeStatus);
  }, [listenToOrders, storeStatus]);

  useEffect(() => {
    getStoreStatus();
  }, [getStoreStatus]);

  return (
    <>
      <LoadingContainer
        loading={loading || loadingStoreStatus || storeStatus === undefined}
        error={error !== undefined || errorStoreStatus !== undefined}
      >
        <div
          style={{
            textAlign: "center",
            backgroundColor: "lightblue",
            color: themeVars.color.background,
            fontWeight: "bold",
          }}
        >
          Olá! Obrigado por utilizar nossos sistemas! No momento, este sistema
          encontra-se em fase de desenvolvimento. Se houverem quaisquer erros,
          por favor, contate nosso suporte.
        </div>

        <div className={homeContainer}>
          <div className={homeGrid}>
            <div className={homeHeader}>
              <IconButton onClick={() => setOpenDrawer(true)}>
                <Settings />
              </IconButton>
              <StoreSwitch
                isOpen={storeStatus?.storeStatus ?? false}
                onStoreOpen={(isOpen) =>
                  changeStoreStatus(new StoreStatus("store-status", isOpen))
                }
              />
              <Image src={icon} width={75} height={75} alt={title} />
            </div>
            <Card
              shadow={themeVars.shadow.shadowBlue}
              Icon={Assignment}
              label="Pedidos"
              href="/orders"
            />
            <Card
              shadow={themeVars.shadow.shadowBlue}
              Icon={AssignmentCheck}
              href="/invoices"
              label="Pedidos faturados"
            />
            <Card
              href="/products"
              shadow={themeVars.shadow.shadowOrange}
              Icon={Liquor}
              label="Produtos"
            />
            <Card
              shadow={themeVars.shadow.shadowLightBlue}
              Icon={LocalShipping}
              label="Bairros"
              href="/neighborhood"
            />
            <Card
              shadow={themeVars.shadow.shadowWhite}
              Icon={Campaign}
              label="Campanhas"
              href="/campaigns"
            />
          </div>
        </div>
        <DrawerSettings
          userLogged={""}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          footerTile={
            <DrawerTile
              type="button"
              onClick={handleSignOut}
              Icon={Logout}
              label="Sair do sistema"
            />
          }
        >
          <DrawerTile
            type="link"
            href="/users"
            Icon={Person}
            label="Usuários"
          />
          <DrawerTile
            type="link"
            href="/minimum-order-price"
            Icon={ShoppingCart}
            label="Pedido mínimo"
          />
          <DrawerTile
            type="link"
            href="#"
            Icon={Discount}
            label="Campanha de desconto (em breve!)"
          />
          <DrawerTile
            type="link"
            href="#"
            Icon={Report}
            label="Relatórios (em breve!)"
          />
        </DrawerSettings>
      </LoadingContainer>
    </>
  );
}
