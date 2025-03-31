import { style } from "@vanilla-extract/css";
import { viewPort } from "@/theme/constants";

export const container = style({
  minHeight: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const form = style({
  width: "60%",
  "@media": {
    [viewPort.small]: {
      width: "100%",
    },
  },
});
