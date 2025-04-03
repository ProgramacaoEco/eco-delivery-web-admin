"use client";

import { useEffect, useRef, useState } from "react";
import { layout, loginLayout } from "./layout.css";

import LinkButton from "@/components/basis/LinkButton";
import { loadingContainer } from "@/components/basis/LoadingContainer/style.css";
import { Typography } from "@/components/basis/Typography";
import { useOnlineStatus } from "@/hooks/useNetworkStatus";
import { cn } from "@/utils/classNames";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import OrderProvider from "./orders/context/OrderProvider";

const inter = Inter({ subsets: ["latin"], weight: "variable" });

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    session: Session;
  };
}>) {
  const pathname = usePathname();
  const noPrint = useRef<HTMLImageElement>(null);
  const mounted = useRef<boolean>(false);

  const isOnline = useOnlineStatus();

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
  const [hasMounted, setHasMounted] = useState(false);

  return (
    <html lang="pt">
      <head>
        <title>Empório das Bebidas</title>
        <meta name="description" content="Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        ) : isOnline ? (
          <OrderProvider>
            <SessionProvider session={params.session}>
              {children}
              <div
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
            </SessionProvider>
          </OrderProvider>
        ) : (
          <div className={loadingContainer}>
            <Typography.TitleBold>
              Você está sem internet. Por favor, verifique sua conexão e tente
              novamente.
            </Typography.TitleBold>
          </div>
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
