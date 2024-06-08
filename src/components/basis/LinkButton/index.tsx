import { ComponentProps } from "react";
import { Typography } from "../Typography";
import { themeVars } from "@/theme/theme.css";

export default function LinkButton({
  children,
  ...props
}: ComponentProps<"a">) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      <Typography.Caption isAnchor color={themeVars.color.accent}>
        {children}
      </Typography.Caption>
    </a>
  );
}
