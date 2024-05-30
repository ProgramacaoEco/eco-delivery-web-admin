import { PropsWithChildren } from "react";
import { TypographyProps } from "@components/basis/Typography";
import { caption } from "./style.css";
import { cn } from "@/utils/classNames";
import { themeVars } from "@/theme/theme.css";

export default function Caption({
  children,
  color = themeVars.color.common.white,
  className = undefined,
}: PropsWithChildren<TypographyProps>) {
  const captionStyle: React.CSSProperties = {
    color: color,
  };

  return (
    <span className={cn(caption, className)} style={captionStyle}>
      {children}
    </span>
  );
}
