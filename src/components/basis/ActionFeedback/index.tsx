import { PropsWithChildren, useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";

interface ActionFeedbackProps {
  state: "success" | "error";
  isClosable?: boolean;
  open: boolean;
  message: string | undefined;
  autoHideDuration?: number | null;
  fullWidth?: boolean;
}

const Success = ({
  message,
  open,
  autoHideDuration,
  isClosable = true,
  fullWidth = false,
  children,
}: PropsWithChildren<ActionFeedbackProps>) => {
  const [hide, setHide] = useState(open);

  const theme = createTheme({
    components: {
      MuiSnackbarContent: {
        styleOverrides: {
          message: fullWidth
            ? {
                textAlign: "center",
                width: "100%",
              }
            : undefined,
          root: {
            "&.MuiSnackbarContent-root": {
              width: fullWidth ? "95vw" : "auto",
              backgroundColor: "green",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        onClose={() => setHide(!hide)}
        ClickAwayListenerProps={{
          onClickAway: isClosable ? () => false : () => {},
        }}
        open={hide}
        message={message}
        autoHideDuration={autoHideDuration}
      />
      {children}
    </ThemeProvider>
  );
};

const Error = ({ message, open, autoHideDuration }: ActionFeedbackProps) => {
  const [hide, setHide] = useState(open);

  const theme = createTheme({
    components: {
      MuiSnackbarContent: {
        styleOverrides: {
          root: {
            "&.MuiSnackbarContent-root": {
              backgroundColor: "red",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={hide}
        onClose={() => setHide(!hide)}
        message={message}
        autoHideDuration={autoHideDuration}
      />
    </ThemeProvider>
  );
};

export default function ActionFeedback({
  message,
  open,
  autoHideDuration,
  state,
  fullWidth,
  children,
}: PropsWithChildren<ActionFeedbackProps>) {
  return state === "success" ? (
    <Success
      message={message}
      open={open}
      state={state}
      fullWidth={fullWidth}
      autoHideDuration={autoHideDuration}
    >
      {children}
    </Success>
  ) : (
    <Error
      message={message}
      open={open}
      state={state}
      autoHideDuration={autoHideDuration}
    />
  );
}
