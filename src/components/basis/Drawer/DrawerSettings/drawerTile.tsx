import { drawerTile, drawerTileLabel } from "./style.css";

import { IconType } from "@/utils/IconType";
import Link from "next/link";
import { Typography } from "../../Typography";
import { themeVars } from "@/theme/theme.css";

interface DrawerTileProps {
  Icon: IconType;
  label: string;
  href?: string;
  onClick?: () => void;
  type: "link" | "button";
}

const Tile = ({
  Icon,
  label,
}: Omit<DrawerTileProps, "href" | "onClick" | "type">) => {
  return (
    <>
      <Icon fontSize={36} />
      <Typography.DisplayLargeRegular
        color={themeVars.color.background}
        className={drawerTileLabel}
      >
        {label}
      </Typography.DisplayLargeRegular>
    </>
  );
};

export default function DrawerTile({
  Icon,
  label,
  href,
  type,
  onClick,
}: DrawerTileProps) {
  return type === "button" ? (
    <div onClick={onClick} className={drawerTile}>
      <Tile Icon={Icon} label={label} />
    </div>
  ) : (
    <Link href={href!} className={drawerTile}>
      <Tile Icon={Icon} label={label} />
    </Link>
  );
}
