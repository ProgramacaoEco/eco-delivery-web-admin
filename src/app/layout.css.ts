import { viewPort } from "@/theme/constants";
import { themeVars } from "@/theme/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("*", {
  padding: "0",
  margin: "0",
  boxSizing: "border-box",
});

globalStyle(".Mui-checked > .MuiSwitch-thumb", {
  color: "#00FF00",
});

globalStyle(".Mui-checked ~ .MuiSwitch-track", {
  backgroundColor: "#00FF00 !important",
});

export const layout = style({
  width: "100%",
  minHeight: "100vh",
  marginRight: "auto",
  marginLeft: "auto",
  backgroundColor: themeVars.color.background,
  "@media": {
    [viewPort.sm]: {
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
