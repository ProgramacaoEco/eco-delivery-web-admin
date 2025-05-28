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

export const info = style({
  marginBottom: "2rem",
  fontWeight: 500,
  fontSize: "1.2rem",
  textAlign: "center",
  background: "#f6f6fa",
  borderRadius: "8px",
  padding: "1.2rem 0.5rem",
  color: "#4B286D",
  boxShadow: "0 2px 8px #0001",
  maxWidth: 420,
  marginLeft: "auto",
  marginRight: "auto",
});

export const submitButton = style({
  width: "100%",
  background: "linear-gradient(90deg, #274B6D 0%, #3A8DFF 100%)",
  color: "#fff",
  fontWeight: 600,
  fontSize: "1.1rem",
  borderRadius: "0.5rem !important",
  padding: "1rem 0",
  cursor: "pointer",
  justifyContent: "center",
  ":hover": {
    filter: "brightness(1.08)",
  },
});

export const activeClubMessage = style({
  marginTop: "2rem",
  color: "#FFF",
  fontSize: "1.1rem",
  textAlign: "center",
  maxWidth: 340,
  fontWeight: 400,
  letterSpacing: 0.1,
});

export const toggleInternal = style({
    position: "absolute",
    top: 2,
    width: 24,
    height: 24,
    background: "#fff",
    borderRadius: "50%",
    transition: "left 0.2s",
    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
});

export const toggleContainer = style({
    position: "absolute",
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
    transition: "background 0.2s",
});

export const checkboxInput = style({
  opacity: 0,
  width: 0,
  height: 0,
});


export const checkbox = style({
    position: "relative",
    display: "inline-block",
    width: 48,
    height: 28,
  });
   
export const checkboxContainer =  style({
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: 500,
    color: "#22223b",
    background: "#fff",
    padding: "1.5rem 2.5rem",
    borderRadius: 32,
    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
    transition: "box-shadow 0.2s",
  });

export const clubInfo =  style({
  color: "#f59e42",
  background: "#fffbe6",
  borderRadius: 8,
  padding: "0.5rem 1rem",
  marginBottom: "1rem",
  fontSize: "0.95rem",
  display: "block",
  textAlign: "center",
  });
