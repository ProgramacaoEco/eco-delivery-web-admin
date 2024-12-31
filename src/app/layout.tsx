"use client";
import { useEffect, useRef } from "react";
import { layout, loginLayout } from "./layout.css";

import ActionFeedback from "@/components/basis/ActionFeedback";
import { loadingContainer } from "@/components/basis/LoadingContainer/style.css";
import { Typography } from "@/components/basis/Typography";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import { cn } from "@/utils/classNames";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";
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

  const { isOnline } = useNetworkStatus();

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
  }, []);

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
        {isOnline ? (
          <OrderProvider>
            <SessionProvider session={params.session}>
              {children}
              <ActionFeedback
                message="Sem conexão"
                state="error"
                autoHideDuration={3000}
                open={!window.navigator.onLine}
              />
            </SessionProvider>
          </OrderProvider>
        ) : (
          <div className={loadingContainer}>
            <Typography.TitleBold>
              Desculpe-nos, parece que algo de errado aconteceu. Por favor,
              recarregue a página e tente novamente. Se o erro persistir,
              contate o suporte.
            </Typography.TitleBold>
          </div>
        )}
      </body>
    </html>
  );
}
