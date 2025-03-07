import { ComponentProps, PropsWithChildren, forwardRef } from "react";

import { Typography } from "../../Typography";
import { cn } from "@/utils/classNames";
import { roundedButton } from "./style.css";

interface RoundedButtonProps {
  buttonColor?: string;
}

const RoundedButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ComponentProps<"button">> & RoundedButtonProps
>(function RoundedButton(
  {
    buttonColor = "transparent",
    children,
    className,
    ...props
  }: PropsWithChildren<ComponentProps<"button">> & RoundedButtonProps,
  ref
) {
  return (
    <button ref={ref} className={cn(roundedButton, className)} {...props}>
      <Typography.DisplayMediumBold>{children}</Typography.DisplayMediumBold>
    </button>
  );
});

export default RoundedButton;
