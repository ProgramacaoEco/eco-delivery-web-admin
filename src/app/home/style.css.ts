import { viewPort } from "@/theme/constants";
import { style } from "@vanilla-extract/css";

export const homeHeader = style({
  marginBottom: "30px",
  textAlign: "center",
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  justifyContent: "center",
});

export const homeContainer = style({
  "@media": {
    [viewPort.small]: {
      padding: "30px",
      top: 0,
    },
  },
  minWidth: "100%",
  position: "relative",
  top: 200,
});

export const containerLineChart = style({
  margin: "30px 0px",
  background: "#4c4c4c",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});