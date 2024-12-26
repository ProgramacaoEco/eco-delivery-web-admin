import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { TextField, outlinedInputClasses, styled } from "@mui/material";

import { ChangeEventHandler } from "react";
import { themeVars } from "@/theme/theme.css";

const inputTextColor = themeVars.color.common.white;

type InputFieldProps<T extends FieldValues> = ControllerRenderProps<T, any>;

const StyledTextField = styled(TextField)(() => ({
  "& label.Mui-focused": {
    color: inputTextColor,
  },
  "& label": {
    color: inputTextColor,
  },
  fieldset: {
    borderColor: `${inputTextColor} !important`,
    color: inputTextColor,
  },
  input: {
    color: inputTextColor,
  },
}));
interface InputTextProps<T extends FieldValues> {
  field?: InputFieldProps<T>;
  label: string;
  error?: boolean;
  required: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export default function InputText<T extends FieldValues>({
  label,
  error = false,
  field,
  required = false,
  onChange,
}: InputTextProps<T>) {
  return (
    <StyledTextField
      style={{ width: "100%" }}
      autoComplete="off"
      variant="outlined"
      label={label}
      error={error}
      onChange={onChange}
      required={required}
      {...field}
      ref={field?.ref}
    />
  );
}
