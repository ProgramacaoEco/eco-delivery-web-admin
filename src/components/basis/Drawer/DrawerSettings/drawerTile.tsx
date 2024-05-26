import Link from "next/link";
import { drawerTile, drawerTileLabel } from "./style.css";
import Image from "next/image";

interface DrawerTileProps {
  iconUrl: string;
  label: string;
  href: string;
}

export default function DrawerTile({ iconUrl, label, href }: DrawerTileProps) {
  return (
    <Link href={href} className={drawerTile}>
      <Image
        src={iconUrl}
        width={48}
        height={48}
        alt={iconUrl}
        draggable={false}
      />
      <div className={drawerTileLabel}>{label}</div>
    </Link>
  );
}
