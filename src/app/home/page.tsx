"use client";

import { Card, IconButton, Stack, Typography } from "@mui/material";
import {
  fetchAndActivate,
  getRemoteConfig,
  getString,
} from "firebase/remote-config";
import { containerLineChart, homeContainer, homeHeader } from "./style.css";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useCallback, useContext, useEffect, useState } from "react";
import useStoreStatus, { StoreStatus } from "@/hooks/useStoreStatus";

import Image from "next/image";
import LoadingContainer from "@/components/basis/LoadingContainer";
import MenuIcon from "@mui/icons-material/Menu";
import { OrderContext } from "../orders/context/OrderContext";
import StoreSwitch from "@/components/basis/StoreSwitch";
import { app } from "@/firebase-config";
import { themeVars } from "@/theme/theme.css";
import useDashboard from "./useDashboard";
import useMediaQuery from "@/hooks/useMediaQuery";
import useOrders from "../orders/hooks/useOrders";
import { viewPort } from "@/theme/constants";
import LineChartDefault from "@/components/basis/LineChartDefault/LineChartDefault";

export default function Page() {
  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");

  const onError = useCallback(() => {}, []);

  const { avgTicket, totalIncome, totalOrders } = useDashboard(onError);
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

          <Stack gap={5}>
            <Typography
              textAlign={"center"}
              variant="h3"
              color={themeVars.color.common.white}
            >
              Dashboard diário
            </Typography>
            <Stack flexDirection={isMobile ? "column" : "row"} gap={4}>
              <Card
                sx={{
                  flexGrow: 1,
                  backgroundColor: "grey",
                  padding: 2,
                  textAlign: "center",
                }}
                variant="outlined"
              >
                <Typography variant="h5" color={themeVars.color.common.white}>
                  Total de pedidos
                </Typography>
                <Typography variant="h6" color={themeVars.color.common.white}>
                  {totalOrders}
                </Typography>
              </Card>
              <Card
                sx={{
                  flexGrow: 1,
                  backgroundColor: "grey",
                  padding: 2,
                  textAlign: "center",
                }}
                variant="outlined"
              >
                <Typography variant="h5" color={themeVars.color.common.white}>
                  Vendas diárias
                </Typography>
                <Typography variant="h6" color={themeVars.color.common.white}>
                  R${" "}
                  {totalIncome?.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </Card>
              <Card
                sx={{
                  flexGrow: 1,
                  backgroundColor: "grey",
                  padding: 2,
                  textAlign: "center",
                }}
                variant="outlined"
              >
                <Typography variant="h5" color={themeVars.color.common.white}>
                  Ticket médio
                </Typography>

                <Typography variant="h6" color={themeVars.color.common.white}>
                  R${" "}
                  {avgTicket.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </Card>
            </Stack>
          </Stack>
          <div className={containerLineChart}>
            <LineChartDefault
            xData={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', "Sab", "Dom"]}
            yData={[10, 20, 5, 12, 8, 9, 10]}
            label="Pedidos por dia"
            xAxisConfig={{
            scaleType: 'point',
            labelStyle: { fill: 'orange' },
            tickLabelStyle: { fill: 'white' },
            }}
            yAxisConfig={{
            labelStyle: { fill: 'lightgreen' },
            tickLabelStyle: { fill: 'lightgreen' },
            }}

          />
          </div>
        </div>
      </LoadingContainer>
    </>
  );
}
