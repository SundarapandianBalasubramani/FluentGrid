import * as React from "react";
import { Input, Field } from "@fluentui/react-components";
import type { InputProps, Slot } from "@fluentui/react-components";
import { FieldType } from "../fields/types";

export const TextBox: React.FC<{
  value: string;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (name: string, value: unknown, data?: unknown) => void;
  contentAfter?: Slot<"span">;
  validationState?: "error" | "warning" | "success" | "none";
  validationMessage?: string;
}> = ({
  name,
  value,
  placeholder,
  onChange,
  label,
  contentAfter,
  disabled,
  required,
  validationState,
  validationMessage,
}) => {
  const onInputChange: InputProps["onChange"] = (_ev, data) =>
    onChange?.(name, FieldType.Text, data.value);
  return (
    <Field
      label={label}
      validationState={validationState}
      validationMessage={validationMessage}
    >
      <Input
        required={required}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
        contentAfter={contentAfter}
      />
    </Field>
  );
};
