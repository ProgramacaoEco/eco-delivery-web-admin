import { style } from "@vanilla-extract/css";
import { themeVars } from "@/theme/theme.css";

export const googleButton = style({
  width: "100%",
  height: "40px",
  borderRadius: "100px",
  backgroundColor: "white",
  borderColor: themeVars.border.googleBorder,
  borderWidth: "2px",
  borderStyle: "solid",
  color: "black",
  fontSize: "16px",
  fontWeight: 550,
  cursor: "pointer",
});
