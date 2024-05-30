"use client";

import { layout, loginLayout } from "./layout.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import Image from "next/image";
import { Inter } from "next/font/google";
import { cn } from "@/utils/classNames";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"], weight: "variable" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
        {children}
      </body>
    </html>
  );
}
