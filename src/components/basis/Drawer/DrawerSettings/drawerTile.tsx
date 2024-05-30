import { drawerTile, drawerTileLabel } from "./style.css";

import { IconType } from "@/utils/IconType";
import Link from "next/link";
import { Typography } from "../../Typography";
import { themeVars } from "@/theme/theme.css";

interface DrawerTileProps {
  Icon: IconType;
  label: string;
  href: string;
}

export default function DrawerTile({ Icon, label, href }: DrawerTileProps) {
  return (
    <Link href={href} className={drawerTile}>
      <Icon fontSize={36} />
      <Typography.DisplayLargeRegular
        color={themeVars.color.background}
        className={drawerTileLabel}
      >
        {label}
      </Typography.DisplayLargeRegular>
    </Link>
  );
}
