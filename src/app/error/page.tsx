import { errorContainer, outlinedButton } from "./style.css";

import Link from "next/link";
import { Typography } from "@/components/basis/Typography";

export default function Error() {
  return (
    <div className={errorContainer}>
      <Typography.DisplayMediumBold>
        Desculpe, mas você não possui permissão para aceder ao sistema. Por
        favor, tente novamente com outro usuário.
      </Typography.DisplayMediumBold>
      <Link className={outlinedButton} href="/">
        <Typography.Caption>
          Retornar para a página principal
        </Typography.Caption>
      </Link>
    </div>
  );
}
