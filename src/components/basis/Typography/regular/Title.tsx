import { PropsWithChildren } from "react";
import { TypographyProps } from "@components/basis/Typography";
import { cn } from "@/utils/classNames";
import { themeVars } from "@/theme/theme.css";
import { title } from "./style.css";

export default function Title({
  children,
  color = themeVars.color.common.white,
  className = undefined,
}: PropsWithChildren<TypographyProps>) {
  const captionStyles: React.CSSProperties = {
    color: color,
  };

  return (
    <h1 className={cn(title, className)} style={captionStyles}>
      {children}
    </h1>
  );
}
