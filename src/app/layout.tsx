"use client";

import { Box, Paper } from "@mui/material";
import {
  fetchAndActivate,
  getRemoteConfig,
  getString,
} from "firebase/remote-config";
import { hideWhatsappButtonOnPrint, loginLayout } from "./layout.css";
import { useEffect, useRef, useState } from "react";

import { AppCheckProvider } from "@/components/basis/AppCheckProvider";
import AuthGuard from "@/components/basis/AuthGuard";
import AuthGuardProvider from "@/components/basis/AuthGuardProvider";
import Image from "next/image";
import { Inter } from "next/font/google";
import LinkButton from "@/components/basis/LinkButton";
import LoadingContainer from "@/components/basis/LoadingContainer";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import OrderProvider from "./orders/context/OrderProvider";
import Sidebar from "@/components/shared/Sidebar";
import { Toaster } from "react-hot-toast";
import { app } from "@/firebase-config";
import { cn } from "@/utils/classNames";
import { themeVars } from "@/theme/theme.css";
import { usePathname } from "next/navigation";

declare global {
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}

const inter = Inter({ subsets: ["latin"], weight: "variable" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noPrint = useRef<HTMLImageElement>(null);
  const mounted = useRef<boolean>(false);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      const remoteConfig = getRemoteConfig(app);
      await fetchAndActivate(remoteConfig);

      const title = getString(remoteConfig, "title");
      const favicon = getString(remoteConfig, "favicon");

      if (typeof document !== "undefined") {
        document.title = title;
      }

      const link = document.querySelector(
        "link[rel~='icon']"
      ) as HTMLLinkElement;
      if (link) {
        link.href = favicon;
      }
    };

    if (hasMounted) {
      fetchConfig();
    }
  }, [hasMounted]);

  useEffect(() => {
    addEventListener("beforeprint", () => {
      if (noPrint.current) {
        noPrint.current.style.visibility = "hidden";
      }
    });

    addEventListener("afterprint", () => {
      if (noPrint.current) {
        noPrint.current.style.visibility = "visible";
      }
    });
    mounted.current = true;
  }, []);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Add this state

  return (
    <html lang="pt">
      <head>
        <title></title>
        <meta name="description" content="Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" />
      </head>
      <body
        className={cn(inter.className, pathname === "/" ? loginLayout : "")}
        style={{
          backgroundColor: themeVars.color.background,
        }}
      >
        <NuqsAdapter>
          <Image
            alt="Logo ECO"
            src="/logo.png"
            width={512}
            height={512}
            draggable={false}
            ref={noPrint}
            style={{
              zIndex: "-1",
              position: "fixed",
              bottom: -90,
              right: -120,
            }}
          />
          {!hasMounted ? (
            <LoadingContainer error={false} loading={true} />
          ) : (
            <AppCheckProvider>
              <AuthGuardProvider>
                <AuthGuard>
                  <OrderProvider>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        height: "100vh",
                      }}
                    >
                      {pathname !== "/" && <Sidebar />}
                      <Paper
                        sx={{
                          flexGrow: 1,
                          p: pathname !== "/" ? 4 : 0,
                          minHeight: "100vh",
                          overflow: "auto",
                          background: "none",
                        }}
                      >
                        {children}
                      </Paper>
                    </Box>
                    <div
                      className={hideWhatsappButtonOnPrint}
                      style={{
                        zIndex: "100",
                        right: 40,
                        bottom: 0,
                        paddingBottom: "1rem",
                        position: "fixed",
                      }}
                    >
                      <LinkButton href="https://wa.me/5551991672281">
                        <Image
                          src="/whatsapp.svg"
                          width={60}
                          height={60}
                          alt="Suporte pelo WhatsApp"
                        />
                      </LinkButton>
                    </div>
                  </OrderProvider>
                </AuthGuard>
              </AuthGuardProvider>
            </AppCheckProvider>
          )}

          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 10000000,
              style: {
                width: "100%",
              },
            }}
          />
        </NuqsAdapter>
      </body>
    </html>
  );
}
