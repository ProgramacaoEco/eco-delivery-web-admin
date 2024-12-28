import { storeClosed, storeOpenColor } from "./style.css";

import Switch from "@mui/material/Switch";
import { useState } from "react";

interface StoreSwitchProps {
  onStoreOpen?: (open: boolean) => void;
}

export default function StoreSwitch({ onStoreOpen }: StoreSwitchProps) {
  const [storeOpen, setStoreOpen] = useState(false);

  return (
    <div style={{ color: "white" }}>
      A loja está{" "}
      {storeOpen ? (
        <span className={storeOpenColor}>aberta</span>
      ) : (
        <span className={storeClosed}>fechada</span>
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
