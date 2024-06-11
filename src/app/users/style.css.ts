import { style } from "@vanilla-extract/css";
import { viewPort } from "@/theme/constants";

export const users = style({
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
