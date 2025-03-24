import { globalStyle, style } from "@vanilla-extract/css";

import { themeVars } from "@/theme/theme.css";
import { viewPort } from "@/theme/constants";

globalStyle("*", {
  padding: "0",
  margin: "0",
  boxSizing: "border-box",
  color: themeVars.color.common.white,
  "@media": {
    print: {
      left: 0,
      printColorAdjust: "exact",
      fontWeight: "bold",
      color: "black !important",
      background: "white !important",
      boxShadow: "none !important",
      textShadow: "none !important",
      width: "100%",
      height: "auto",
      fontSize: "1rem",
      padding: "0",
      textAlign: "left",
      margin: "0",
      transform: "scale(0.96) translateX(-0.2rem) translateY(-0.2rem)",
      border: "none",
      tableLayout: "initial",
      borderCollapse: "unset",
      alignContent: "start",
      justifyContent: "start",
      alignItems: "start",
    },
  },
});

globalStyle(".Mui-checked > .MuiSwitch-thumb", {
  color: "#00FF00",
});

globalStyle(".Mui-checked ~ .MuiSwitch-track", {
  backgroundColor: "#00FF00 !important",
});

export const loginLayout = style({
  backgroundColor: themeVars.color.background,
  height: "100%",
});

export const layout = style({
  width: "100%",
  minHeight: "100vh",
  marginRight: "auto",
  marginLeft: "auto",
  backgroundColor: themeVars.color.background,
  "@media": {
    [viewPort.small]: {
      padding: "2rem",
      maxWidth: "640px",
    },
    [viewPort.md]: {
      maxWidth: "768px",
    },
    [viewPort.lg]: {
      maxWidth: "1024px",
    },
    [viewPort.xl]: {
      maxWidth: "1280px",
    },
  },
});
