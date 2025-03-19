import { globalStyle, style } from "@vanilla-extract/css";

import { themeVars } from "@/theme/theme.css";

export const orderButtonPickingStatus = style({
  width: "100%",
  backgroundColor: "green !important",
});

export const orderButtonSentStatus = style({
  width: "100%",
  backgroundColor: "orange !important",
});

export const orderButtonDeliveredStatus = style({
  width: "100%",
  backgroundColor: "blue !important",
});

export const orderButtonContainer = style({
  marginTop: "2rem",
});

export const orderHeader = style({
  textAlign: "center",
});

globalStyle("table", {
  border: "1px solid #ccc",
  borderCollapse: "collapse",
  margin: 0,
  padding: 0,
  color: "white",
  width: "100%",
  tableLayout: "fixed",
});

globalStyle("table caption", {
  fontSize: "1.5em",
  margin: ".5em 0 .75em",
});

globalStyle("table tr", {
  border: "1px solid #ddd",
  padding: ".35em",
  backgroundColor: themeVars.color.tileOdd,
});

globalStyle("table th, table td", {
  padding: "1em",

  textAlign: "center",
});

globalStyle("table th", {
  color: "white",
  fontSize: ".85em",
  letterSpacing: ".1em",
  textTransform: "uppercase",
});

globalStyle("table", {
  "@media": {
    "screen and (max-width: 768px)": {
      border: 0,
    },
    print: {
      border: 0,
    },
  },
});

globalStyle("table caption", {
  "@media": {
    "screen and (max-width: 768px)": {
      fontSize: "1.3em",
    },
    print: {
      fontSize: "1.3em",
    },
  },
});

globalStyle("table thead", {
  "@media": {
    "screen and (max-width: 768px)": {
      border: "none",
      clip: "rect(0 0 0 0)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      width: "1px",
    },
    print: {
      border: "none",
      clip: "rect(0 0 0 0)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      width: "1px",
    },
  },
});

globalStyle("table tr", {
  "@media": {
    "screen and (max-width: 768px)": {
      display: "block",
      marginBottom: ".625em",
    },
    print: {
      display: "block",
      marginBottom: ".625em",
    },
  },
});

globalStyle("table td", {
  "@media": {
    "screen and (max-width: 768px)": {
      borderBottom: "1px solid #ddd",
      display: "block",
      fontSize: ".8em",
      textAlign: "right",
    },
    print: {
      borderBottom: "1px solid #ddd",
      display: "block",
      fontSize: ".8em",
      textAlign: "right",
    },
  },
});

globalStyle("table td::before", {
  "@media": {
    "screen and (max-width: 768px)": {
      content: "attr(data-label)",
      float: "left",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    print: {
      content: "attr(data-label)",
      float: "left",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
  },
});

globalStyle("table td:last-child", {
  "@media": {
    "screen and (max-width: 768px)": {
      borderBottom: 0,
      marginBottom: "1em",
    },
    print: {
      borderBottom: 0,
      marginBottom: "1em",
    },
  },
});
