import * as React from "react";
import { Field, Textarea } from "@fluentui/react-components";
import type { TextareaProps } from "@fluentui/react-components";

export const MultiLine: React.FC<{
  value: string;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (name: string, value: string) => void;
}> = ({ name, value, label, onChange, required, disabled }) => {
  const change: TextareaProps["onChange"] = (_ev, data) => {
    onChange?.(name, data.value);
  };

  return (
    <Field label={label} required={required}>
      <Textarea value={value} disabled={disabled} onChange={change} />
    </Field>
  );
};
