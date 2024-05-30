import { ComponentProps, PropsWithChildren } from "react";

import GoogleLogo from "@icons/GoogleLogo";
import { googleButton } from "./style.css";

export default function GoogleButton({
  children,
  ...props
}: PropsWithChildren<ComponentProps<"button">>) {
  return (
    <button className={googleButton} {...props}>
      <div>
        <GoogleLogo style={{ verticalAlign: "text-top" }} /> {children}
      </div>
    </button>
  );
}
