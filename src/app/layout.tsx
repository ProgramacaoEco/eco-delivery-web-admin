"use client";

import {
  fetchAndActivate,
  getRemoteConfig,
  getString,
} from "firebase/remote-config";
import { useEffect, useRef, useState } from "react";
import { hideWhatsappButtonOnPrint, layout, loginLayout } from "./layout.css";

import { AppCheckProvider } from "@/components/basis/AppCheckProvider";
import AuthGuard from "@/components/basis/AuthGuard";
import LinkButton from "@/components/basis/LinkButton";
import { loadingContainer } from "@/components/basis/LoadingContainer/style.css";
import { app } from "@/firebase-config";
import { cn } from "@/utils/classNames";
import { Inter } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import OrderProvider from "./orders/context/OrderProvider";

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
        className={cn(inter.className, pathname === "/" ? loginLayout : layout)}
      >
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
          <div className={loadingContainer}>Carregando...</div>
        ) : (
          <AppCheckProvider>
            <AuthGuard>
              <OrderProvider>
                {children}
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
      </body>
    </html>
  );
}
