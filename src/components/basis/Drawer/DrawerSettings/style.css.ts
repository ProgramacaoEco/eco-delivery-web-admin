import { style } from "@vanilla-extract/css";
import { themeVars } from "@/theme/theme.css";
import { viewPort } from "@/theme/constants";

export const drawerContentContainer = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  position: "relative",
});

export const drawerSettingsContent = style({
  width: "350px",
  backgroundColor: "white",
  "@media": {
    [viewPort.small]: {
      width: "100vw",
    },
  },
});

export const drawerCloseButtonMobile = style({
  display: "none",
  "@media": {
    [viewPort.small]: {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
});

export const drawerTile = style({
  padding: "10px",
  display: "flex",
  width: "100%",
  fontSize: "1.4rem",
  cursor: "pointer",
  alignItems: "center",
  backgroundColor: "#F2F2F2",
  textDecoration: "none",
  color: themeVars.color.background,
  userSelect: "none",
});

export const drawerTileLabel = style({
  marginLeft: "40px",
});

export const drawerHeader = style({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  "@media": {
    [viewPort.small]: {
      display: "flex !important",
      justifyContent: "space-between",
    },
  },
  alignItems: "center",
  width: "100%",
  padding: "30px",
  fontSize: "1.5rem",
  textAlign: "center",
  backgroundColor: themeVars.color.background,
  color: "white",
});

export const drawerHeaderCloseButton = style({
  display: "none !important",
  "@media": {
    [viewPort.small]: {
      display: "flex !important",
    },
  },
});

export const drawerFooter = style({
  position: "absolute",
  left: "0",
  right: "0",
  bottom: "0",
});
