import { ComponentProps, PropsWithChildren } from "react";

import { Typography } from "../../Typography";
import { roundedButton } from "./style.css";

interface RoundedButtonProps {
  buttonColor?: string;
}

export default function RoundedButton({
  buttonColor = "transparent",
  children,
  ...props
}: PropsWithChildren<ComponentProps<"button">> & RoundedButtonProps) {
  return (
    <button
      style={{ backgroundColor: buttonColor }}
      className={roundedButton}
      {...props}
    >
      <Typography.DisplayMediumBold>{children}</Typography.DisplayMediumBold>
    </button>
  );
}
