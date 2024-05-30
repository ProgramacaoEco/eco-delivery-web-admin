import GoogleLogo from "@icons/GoogleLogo";
import Link from "next/link";
import { Typography } from "../../Typography";
import { googleButton } from "./style.css";
import { themeVars } from "@/theme/theme.css";

interface GoogleButtonProps {
  href: string;
  onClick?: () => void;
}

export default function GoogleButton({ ...props }: GoogleButtonProps) {
  return (
    <Link className={googleButton} {...props}>
      <div>
        <GoogleLogo
          style={{ verticalAlign: "text-top", marginRight: "0.8125rem" }}
        />{" "}
        <Typography.Caption color={themeVars.color.background}>
          Continuar com o Google
        </Typography.Caption>
      </div>
    </Link>
  );
}
