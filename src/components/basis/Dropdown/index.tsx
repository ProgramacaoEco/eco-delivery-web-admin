import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  SelectProps,
  selectClasses,
  styled,
} from "@mui/material";
import { PropsWithChildren, useState } from "react";

const StyledDropdown = styled(Select)(() => ({
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  [`.${selectClasses.select}`]: {
    color: "white !important",
  },
}));

export default function Dropdown({
  children,
  ...props
}: PropsWithChildren<SelectProps>) {
  return <StyledDropdown {...props}>{children}</StyledDropdown>;
}
