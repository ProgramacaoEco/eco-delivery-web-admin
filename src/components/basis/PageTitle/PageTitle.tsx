import { Close, CloseDark } from "@icons/index";
import { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@/components/basis/Typography";
import { hideInPrint } from "./style.css";
import { themeVars } from "@/theme/theme.css";
import { useRouter } from "next/navigation";

interface PageTitleProps {
  onClose?: () => void;
  isLoading: boolean;
  title: string;
  subtitle?: string;
  dark?: boolean;
}

export default function PageTitle({
  onClose,
  title,
  isLoading = false,
  dark = false,
  subtitle = undefined,
}: PageTitleProps) {
  const router = useRouter();

  const appbarStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    height: themeVars.height.appbarDefaultHeight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    verticalAlign: "middle",
    marginBottom: themeVars.height.appbarDefaultHeight,
    textOverflow: "ellipsis",
    boxShadow: "none",
  };

  const closeIconButton: React.CSSProperties = {
    fontSize: "2rem",
    position: "absolute",
    right: "1rem",
    bottom: "1.5rem",
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

  const CloseIcon = dark ? CloseDark : Close;

  return (
    <Box sx={{ height: "5.5rem" }} className={hideInPrint}>
      {show && (
        <AppBar style={appbarStyle}>
          <Typography.TitleRegular
            color={dark ? themeVars.color.background : "white"}
          >
            <div style={{ textAlign: "left" }}>
              {title}
              <br />
              {subtitle}
            </div>

            <IconButton
              style={closeIconButton}
              onClick={
                isLoading
                  ? undefined
                  : () => {
                      if (!!onClose) {
                        onClose();
                      }
                      return router.push("/home");
                    }
              }
            >
              <CloseIcon />
            </IconButton>
          </Typography.TitleRegular>
        </AppBar>
      )}
    </Box>
  );
}
