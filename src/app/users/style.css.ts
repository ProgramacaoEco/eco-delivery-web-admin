import { globalStyle, style } from "@vanilla-extract/css";

import { viewPort } from "@/theme/constants";

globalStyle(".MuiSnackbarContent-root", {
  backgroundColor: "red",
});

const users = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  "@media": {
    [viewPort.small]: {
      padding: "20px",
    },
  },
});

export default users;
