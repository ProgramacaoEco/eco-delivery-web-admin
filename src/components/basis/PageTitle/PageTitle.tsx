import { AppBar, Box, IconButton } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { Close } from "@icons/index";
import { Typography } from "@/components/basis/Typography";
import { themeVars } from "@/theme/theme.css";
import { useRouter } from "next/navigation";

interface PageTitleProps {
  color: string;
  onClose?: () => void;
  route?: string;
  title: string;
}

export default function PageTitle({
  color,
  onClose,
  title,
  route,
}: PageTitleProps) {
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

  const [show, setShow] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 0) {
        setShow(false);
      } else {
        setShow(true);
      }
    };

    controlNavbar();

    window.addEventListener("scroll", controlNavbar);

    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  return (
    <Box sx={{ height: "5.5rem" }}>
      {show && (
        <AppBar style={appbarStyle}>
          <Typography.TitleRegular>
            {title}
            <IconButton
              style={closeIconButton}
              onClick={() => {
                if (!!onClose) {
                  onClose();
                }
                return router.back();
              }}
            >
              <Close />
            </IconButton>
          </Typography.TitleRegular>
        </AppBar>
      )}
    </Box>
  );
}
