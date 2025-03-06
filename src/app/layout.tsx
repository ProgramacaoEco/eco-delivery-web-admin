"use client";

import { layout, loginLayout } from "./layout.css";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { Inter } from "next/font/google";
import OrderProvider from "./orders/context/OrderProvider";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Typography } from "@/components/basis/Typography";
import { cn } from "@/utils/classNames";
import { loadingContainer } from "@/components/basis/LoadingContainer/style.css";
import { useOnlineStatus } from "@/hooks/useNetworkStatus";
import { usePathname } from "next/navigation";

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
        <title>Eco Delivery</title>
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
          // Show empty state during hydration
          <div className={loadingContainer}></div>
        ) : isOnline ? (
          <OrderProvider>
            <SessionProvider session={params.session}>
              {children}
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
      </body>
    </html>
  );
}
