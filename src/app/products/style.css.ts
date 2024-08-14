import { style } from "@vanilla-extract/css";

export const fileInput = style({
  display: "none",
});

export const fileInputImage = style({
  height: "26rem",
  width: "40%",
  objectFit: "cover",
});

export const picker = style({
  width: "40%",
  marginTop: "2rem",
  marginBottom: "40px",
  height: "26rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px white solid",
});
