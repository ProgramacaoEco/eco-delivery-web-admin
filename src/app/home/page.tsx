"use client";

import {
  Assignment,
  AssignmentCheck,
  Campaign,
  Liquor,
  LocalShipping,
} from "@icons/index";
import {
  fetchAndActivate,
  getRemoteConfig,
  getString,
} from "firebase/remote-config";
import { homeContainer, homeGrid, homeHeader } from "./style.css";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useContext, useEffect, useState } from "react";
import useStoreStatus, { StoreStatus } from "@/hooks/useStoreStatus";

import Card from "@/components/basis/Card";
import { IconButton } from "@mui/material";
import Image from "next/image";
import LoadingContainer from "@/components/basis/LoadingContainer";
import MenuIcon from "@mui/icons-material/Menu";
import { OrderContext } from "../orders/context/OrderContext";
import StoreSwitch from "@/components/basis/StoreSwitch";
import { app } from "@/firebase-config";
import { themeVars } from "@/theme/theme.css";
import useMediaQuery from "@/hooks/useMediaQuery";
import useOrders from "../orders/hooks/useOrders";
import { viewPort } from "@/theme/constants";

export default function Page() {
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

  const [_, setDrawerOpen] = useQueryState("drawerOpen", parseAsBoolean);
  const isMobile = useMediaQuery(viewPort.small);

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
              {isMobile ? (
                <IconButton onClick={() => setDrawerOpen(true)}>
                  <MenuIcon />
                </IconButton>
              ) : (
                <div></div>
              )}
              <StoreSwitch
                isOpen={storeStatus?.storeStatus ?? false}
                onStoreOpen={(isOpen) =>
                  changeStoreStatus(new StoreStatus("storeStatus", isOpen))
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
      </LoadingContainer>
    </>
  );
}
