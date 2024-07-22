import { createGlobalTheme, createTheme } from "@vanilla-extract/css";

export const themeVars = createGlobalTheme(":root", {
  shadow: {
    shadowBlue: "inset 0 4px 0px 0 #2A73A1",
    shadowLightBlue: "inset 0 4px 0px 0 #81D1F0",
    shadowOrange: "inset 0 4px 0px 0 #F68751",
    shadowWhite: "inset 0 4px 0px 0 #FFFFFF",
  },
  border: {
    googleBorder: "#747775",
  },
  height: {
    appbarDefaultHeight: "5rem",
  },
  color: {
    users: {
      appbarColor: "#7A7A7A",
    },
    faturados: {
      orderCard: "#666666",
    },
    accent: "#F26623",
    card: "#676767",
    tileEven: "#7A7A7A",
    tileOdd: "#545454",
    background: "#404040",
    common: {
      white: "white",
      black: "black",
    },
  },
});
