import Link from "next/link";
import Image from "next/image";
import { card } from "./style.css";
import { cn } from "@/utils/classNames";
import useMediaQuery from "@/hooks/useMediaQuery";
import { viewPort } from "@/theme/constants";

interface CardProps {
  label: string;
  iconUrl: string;
  shadow?: string;
}

export default function Card({
  iconUrl,
  label,
  shadow = undefined,
}: CardProps) {
  const iconSize = 48;

  return (
    <Link href="#" className={card} style={{ boxShadow: shadow }}>
      <div>
        <Image alt={iconUrl} src={iconUrl} width={iconSize} height={iconSize} />
        <div>{label}</div>
      </div>
    </Link>
  );
}
