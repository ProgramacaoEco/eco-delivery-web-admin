import { Roboto } from "next/font/google";
import { cn } from "@utils/classNames";
import { storeOpenColor } from "./style.css";
import { Switch } from "@mui/material";
import { useState } from "react";

interface StoreSwitchProps {
  onStoreOpen?: (open: boolean) => void;
}

const roboto = Roboto({ subsets: ["latin"], weight: "900" });

export default function StoreSwitch({ onStoreOpen }: StoreSwitchProps) {
  const [storeOpen, setStoreOpen] = useState(false);

  return (
    <div style={{ color: "white" }}>
      A loja está{" "}
      {storeOpen ? (
        <span className={cn(storeOpenColor, roboto.className)}>aberta</span>
      ) : (
        <span className={roboto.className}>fechada</span>
      )}
      .
      <Switch
        onClick={() => {
          setStoreOpen((prev) => !prev);
          if (typeof onStoreOpen !== "undefined") {
            onStoreOpen!(storeOpen);
          }
        }}
        size="medium"
      />
    </div>
  );
}
