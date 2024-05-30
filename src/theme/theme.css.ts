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
  color: {
    accent: "#F26623",
    card: "#676767",
    background: "#404040",
    common: {
      white: "white",
      black: "black",
    },
  },
});
