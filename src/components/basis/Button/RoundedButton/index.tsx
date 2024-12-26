import { ComponentProps, PropsWithChildren, forwardRef } from "react";

import { Typography } from "../../Typography";
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
    ...props
  }: PropsWithChildren<ComponentProps<"button">> & RoundedButtonProps,
  ref
) {
  return (
    <button
      ref={ref}
      style={{ backgroundColor: buttonColor }}
      className={roundedButton}
      {...props}
    >
      <Typography.DisplayMediumBold>{children}</Typography.DisplayMediumBold>
    </button>
  );
});

export default RoundedButton;
