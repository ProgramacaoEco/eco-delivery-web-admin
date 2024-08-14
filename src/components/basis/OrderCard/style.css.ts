import { style } from "@vanilla-extract/css";
import { themeVars } from "@/theme/theme.css";
import { viewPort } from "@/theme/constants";

export const orderCard = style({
  ":active": {
    cursor: "grabbing",
  },
  position: "relative",
  cursor: "grab",
  borderRadius: "25px",
  width: "100%",
  border: "1px solid white",
  height: "750px",
  backgroundColor: themeVars.color.invoiced.orderCard,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  justifyContent: "space-around",
  "@media": {
    [viewPort.md]: {
      width: "768px",
    },
    [viewPort.lg]: {
      width: "1024px",
    },
    [viewPort.xl]: {
      width: "1280px",
    },
  },
});
