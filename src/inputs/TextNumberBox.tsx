import * as React from "react";
import type { Slot } from "@fluentui/react-components";
import { TextBox } from "./TextBox";

export const TextNumberBox: React.FC<{
  value: string;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (name: string, value: unknown, data?: unknown) => void;
  contentAfter?: Slot<"span">;
}> = ({
  name,
  value,
  placeholder,
  onChange,
  label,
  contentAfter,
  disabled,
  required,
}) => {
  const [state, setState] = React.useState<{
    validationState?: "error" | "warning" | "success" | "none";
    validationMessage?: string;
  }>();

  const onNumberChange = (name: string, val: unknown, data?: unknown) => {
    if (val) {
      const isNot_A_Number = isNaN(parseFloat(val as string));
      if (!isNot_A_Number) {
        onChange?.(name, parseFloat(val as string), data);
        setState(undefined);
      } else {
        setState({
          validationMessage: "Please enter numbers",
          validationState: "warning",
        });
        onChange?.(name, "", data);
      }
    } else onChange?.(name, "", data);
  };

  return (
    <TextBox
      name={name}
      value={value}
      label={label}
      required={required}
      disabled={disabled}
      onChange={onNumberChange}
      placeholder={placeholder}
      contentAfter={contentAfter}
      validationMessage={state?.validationMessage}
      validationState={state?.validationState}
    />
  );
};
