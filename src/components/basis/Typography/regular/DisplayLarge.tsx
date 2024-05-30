import { PropsWithChildren } from "react";
import { TypographyProps } from "@components/basis/Typography";
import { cn } from "@/utils/classNames";
import { displayLarge } from "./style.css";
import { themeVars } from "@/theme/theme.css";

export default function DisplayLarge({
  children,
  color = themeVars.color.common.white,
  className = undefined,
}: PropsWithChildren<TypographyProps>) {
  const captionStyles: React.CSSProperties = {
    color: color,
  };

  return (
    <h2 className={cn(displayLarge, className)} style={captionStyles}>
      {children}
    </h2>
  );
}
