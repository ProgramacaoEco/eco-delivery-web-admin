import { viewPort } from "@/theme/constants";
import { style } from "@vanilla-extract/css";

export const homeGrid = style({
  display: "grid",
  gridTemplateColumns: "25% 25%",
  gridTemplateRows: "none",
  gap: "10px",
  justifyContent: "center",
  "@media": {
    [viewPort.small]: {
      gridTemplateColumns: "1fr",
    },
  },
});

export const homeHeader = style({
  gridColumnStart: 1,
  marginBottom: "30px",
  gridColumnEnd: 3,
  "@media": {
    [viewPort.small]: {
      gridColumnEnd: 1,
    },
  },
  textAlign: "center",
  gridTemplateColumns: "20% 60% 20%",
  display: "grid",
  alignItems: "center",
  justifyItems: "center",
});

export const homeContainer = style({
  "@media": {
    [viewPort.small]: {
      padding: "30px",
    },
  },
  minWidth: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
  minHeight: "inherit",
});
