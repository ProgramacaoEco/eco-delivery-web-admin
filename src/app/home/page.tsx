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
} from "@icons/index";
import { homeContainer, homeGrid, homeHeader } from "./style.css";
import { signOut, useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import useStoreStatus, { StoreStatus } from "@/hooks/useStoreStatus";

import ActionFeedback from "@/components/basis/ActionFeedback";
import Card from "@/components/basis/Card";
import DrawerSettings from "@/components/basis/Drawer/DrawerSettings";
import DrawerTile from "@/components/basis/Drawer/DrawerSettings/drawerTile";
import { Howl } from "howler";
import { IconButton } from "@mui/material";
import Image from "next/image";
import LoadingContainer from "@/components/basis/LoadingContainer";
import { OrderContext } from "../orders/context/OrderContext";
import StoreSwitch from "@/components/basis/StoreSwitch";
import { themeVars } from "@/theme/theme.css";
import useOrders from "../orders/hooks/useOrders";

export default function Page() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const session = useSession();

  const { listenToOrders } = useOrders();
  const {
    changeStoreStatus,
    error: errorStoreStatus,
    getStoreStatus,
    loading: loadingStoreStatus,
    storeStatus,
  } = useStoreStatus();
  const { loading, error, orders } = useContext(OrderContext);
  const [orderQuantity, setOrderQuantity] = useState(0);

  useEffect(() => {
    listenToOrders();
  }, [listenToOrders]);

  useEffect(() => {
    getStoreStatus();
  }, [getStoreStatus]);

  useEffect(() => {
    if (orders === undefined) return;

    const orderQuantity = orders.filter((o) => !o.isViewed).length;

    if (storeStatus && storeStatus.storeStatus && orders && orderQuantity) {
      setOrderQuantity(orderQuantity);
      new Howl({
        src: ["/sound/notification.wav"],
        html5: true,
        autoplay: true,
      }).play();
    }
  }, [orders, storeStatus]);

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
          userLogged={session.data?.user?.name?.split(" ")[0] ?? ""}
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
          <DrawerTile
            type="link"
            href="/users"
            Icon={Person}
            label="Usuários"
          />
          <DrawerTile
            type="link"
            href="#"
            Icon={Report}
            label="Relatórios (em breve!)"
          />
        </DrawerSettings>
        <ActionFeedback
          message={`Você tem ${
            orderQuantity === 1
              ? `${orderQuantity} novo pedido`
              : `${orderQuantity} novos pedidos`
          } `}
          autoHideDuration={null}
          fullWidth
          isClosable={false}
          open={(storeStatus?.storeStatus ?? false) && orderQuantity > 0}
          state="success"
        />
      </LoadingContainer>
    </>
  );
}
