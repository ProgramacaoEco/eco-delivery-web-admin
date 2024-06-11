import { AppBar, Box, IconButton } from "@mui/material";

import { Close } from "@icons/index";
import { Typography } from "@/components/basis/Typography";
import { themeVars } from "@/theme/theme.css";
import { useRouter } from "next/navigation";

interface PageTitleProps {
  color: string;
  onClose?: () => void;
  title: string;
}

export default function PageTitle({ color, onClose, title }: PageTitleProps) {
  const router = useRouter();

  const appbarStyle: React.CSSProperties = {
    backgroundColor: color,
    height: themeVars.height.appbarDefaultHeight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    verticalAlign: "middle",
    marginBottom: themeVars.height.appbarDefaultHeight,
    textOverflow: "ellipsis",
  };

  const closeIconButton: React.CSSProperties = {
    fontSize: "2rem",
    position: "absolute",
    right: "2.5rem",
    padding: "0",
  };

  return (
    <Box sx={{ height: "5.5rem" }}>
      <AppBar style={appbarStyle}>
        <Typography.TitleRegular>
          {title}
          <IconButton
            style={closeIconButton}
            onClick={() => {
              if (!!onClose) {
                onClose();
              }
              return router.replace("/");
            }}
          >
            <Close />
          </IconButton>
        </Typography.TitleRegular>
      </AppBar>
    </Box>
  );
}
