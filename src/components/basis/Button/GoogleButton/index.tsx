import { ComponentProps, PropsWithChildren } from "react";

import GoogleLogo from "@icons/GoogleLogo";
import { Typography } from "../../Typography";
import { googleButton } from "./style.css";
import { themeVars } from "@/theme/theme.css";

export default function GoogleButton({
  children,
  ...props
}: PropsWithChildren<ComponentProps<"button">>) {
  return (
    <button className={googleButton} {...props}>
      <div>
        <GoogleLogo
          style={{ verticalAlign: "text-top", marginRight: "0.8125rem" }}
        />{" "}
        <Typography.Caption color={themeVars.color.background}>
          {children}
        </Typography.Caption>
      </div>
    </button>
  );
}
