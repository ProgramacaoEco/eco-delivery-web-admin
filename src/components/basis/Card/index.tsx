import { IconType } from "@/utils/IconType";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "../Typography";
import { card } from "./style.css";

interface CardProps {
  label: string;
  Icon: IconType;
  shadow?: string;
}

export default function Card({ Icon, label, shadow = undefined }: CardProps) {
  return (
    <Link href="#" className={card} style={{ boxShadow: shadow }}>
      <div>
        <Icon fontSize={36} />
        <Typography.TitleRegular>{label}</Typography.TitleRegular>
      </div>
    </Link>
  );
}
