import { ControllerRenderProps, FieldValues } from "react-hook-form";
import {
  TextField,
  ThemeProvider,
  createTheme,
  outlinedInputClasses,
} from "@mui/material";

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
type InputFieldProps<T extends FieldValues> = ControllerRenderProps<T, any>;

interface InputTextProps<T extends FieldValues> {
  field: InputFieldProps<T>;
  label: string;
  error?: boolean;
}

export default function InputText<T extends FieldValues>({
  label,
  error = false,
  field,
}: InputTextProps<T>) {
  return (
    <ThemeProvider theme={inputTextTheme}>
      <TextField
        style={{ width: "100%" }}
        autoComplete="off"
        variant="outlined"
        label={label}
        error={error}
        {...field}
        ref={field.ref}
      />
    </ThemeProvider>
  );
}
