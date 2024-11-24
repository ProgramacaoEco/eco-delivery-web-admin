"use client";

import { layout, loginLayout } from "./layout.css";
import { usePathname, useRouter } from "next/navigation";

import FirebaseProvider from "@/helpers/firestore/context/FirebaseProvider";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { cn } from "@/utils/classNames";

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
          style={{
            zIndex: "-1",
            position: "fixed",
            bottom: -90,
            right: -120,
          }}
        />
        <FirebaseProvider>
          <SessionProvider session={params.session}>{children}</SessionProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
