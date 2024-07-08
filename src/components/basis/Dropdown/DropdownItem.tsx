import { MenuItem, MenuItemProps, selectClasses, styled } from "@mui/material";

import { PropsWithChildren } from "react";
import { themeVars } from "@/theme/theme.css";

const StyledMenuItem = styled(MenuItem)(() => ({
  "&": {
    color: themeVars.color.background + " !important",
  },
}));

export default function DropdownItem({
  children,
  ...props
}: PropsWithChildren<MenuItemProps>) {
  return <StyledMenuItem {...props}>{children}</StyledMenuItem>;
}
