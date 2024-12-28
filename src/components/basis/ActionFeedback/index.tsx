import Snackbar from "@mui/material/Snackbar";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import { useState } from "react";

interface ActionFeedbackProps {
  state: "success" | "error";
  open: boolean;
  message: string | undefined;
  autoHideDuration?: number;
}

const Success = ({ message, open, autoHideDuration }: ActionFeedbackProps) => {
  const [hide, setHide] = useState(open);

  const theme = createTheme({
    components: {
      MuiSnackbarContent: {
        styleOverrides: {
          root: {
            "&.MuiSnackbarContent-root": {
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
        open={hide}
        message={message}
        autoHideDuration={autoHideDuration}
      />
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
}: ActionFeedbackProps) {
  return state === "success" ? (
    <Success
      message={message}
      open={open}
      state={state}
      autoHideDuration={autoHideDuration}
    />
  ) : (
    <Error
      message={message}
      open={open}
      state={state}
      autoHideDuration={autoHideDuration}
    />
  );
}
