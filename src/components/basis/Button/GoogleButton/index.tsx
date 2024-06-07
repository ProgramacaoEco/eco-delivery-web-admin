import GoogleLogo from "@icons/GoogleLogo";
import { Typography } from "../../Typography";
import { googleButton } from "./style.css";
import { themeVars } from "@/theme/theme.css";

export default function GoogleButton({ action }: { action: () => void }) {
  return (
    <button className={googleButton} onClick={action}>
      <GoogleLogo
        style={{ verticalAlign: "text-top", marginRight: "0.8125rem" }}
      />{" "}
      <Typography.Caption color={themeVars.color.background}>
        Continuar com o Google
      </Typography.Caption>
    </button>
  );
}
