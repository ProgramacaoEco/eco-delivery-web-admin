import { style } from "@vanilla-extract/css";

export const errorContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  gap: "1.25rem",
});

export const outlinedButton = style({
  textDecoration: "none",
  padding: "20px",
  background: "none",
  border: "2px solid white",
  borderRadius: "100px",
  cursor: "pointer",
});
