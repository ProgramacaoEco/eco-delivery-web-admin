import {
  TextField,
  ThemeProvider,
  createTheme,
  outlinedInputClasses,
} from "@mui/material";

import { ChangeEvent } from "react";
import { themeVars } from "@/theme/theme.css";

const inputTextColor = themeVars.color.common.white;

const inputTextTheme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: inputTextColor,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: inputTextColor,
          },
          "& label": {
            color: inputTextColor,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: inputTextColor,
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: inputTextColor,
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: inputTextColor,
          },
        },
      },
    },
  },
});

interface InputTextProps {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function InputText({ label, onChange, value }: InputTextProps) {
  return (
    <ThemeProvider theme={inputTextTheme}>
      <TextField
        variant="outlined"
        label={label}
        value={value}
        onChange={onChange}
      />
    </ThemeProvider>
  );
}
