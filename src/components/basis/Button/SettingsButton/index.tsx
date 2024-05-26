import { IconButton } from "@mui/material";
import Image from "next/image";

interface SettingsButtonProps {
  onClick?: () => void;
}

export default function SettingsButton({ onClick }: SettingsButtonProps) {
  return (
    <IconButton color="primary" onClick={onClick}>
      <Image
        src="/icons/settings.svg"
        width={48}
        height={48}
        alt="Configurações"
        draggable={false}
      />
    </IconButton>
  );
}
