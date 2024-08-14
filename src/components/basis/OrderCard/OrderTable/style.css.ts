import { style } from "@vanilla-extract/css";
import { viewPort } from "@/theme/constants";

export const orderTable = style({
  borderCollapse: "collapse",
  width: "100%",
  alignSelf: "center",
});

export const orderTableDivider = style({
  width: "100%",
  backgroundColor: "white",
  height: "2px",
});

export const tableContainer = style({
  overflowY: "auto",
  overflowX: "hidden",
  height: "400px",
});

export const tableData = style({
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: "5px",
});

export const tableDataCode = style({
  width: "14ch",
  "@media": {
    [viewPort.xs]: {
      width: "8ch",
    },
    [viewPort.sm]: {
      width: "8ch",
    },
  },

  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const tableDataDescription = style({
  width: "1000px",
  "@media": {
    [viewPort.xs]: {
      width: "200px",
    },
    [viewPort.sm]: {
      width: "315px",
    },
    [viewPort.md]: {
      width: "500px",
    },
    [viewPort.lg]: {
      width: "740px",
    },
  },

  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const tableDataDivider = style({
  width: "100%",
  backgroundColor: "white",
  height: "1px",
});
