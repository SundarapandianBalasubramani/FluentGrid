import * as React from "react";
import {
  makeStyles,
  shorthands,
  useId,
  Input,
  Label,
} from "@fluentui/react-components";
import type { InputProps, Slot } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("2px"),
  },
});

export const TextBox: React.FC<{
  value: string;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (name: string, value: string) => void;
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
  const inputId = useId("input");
  const styles = useStyles();
  const onInputChange: InputProps["onChange"] = (_ev, data) =>
    onChange?.(name, data.value);
  return (
    <div className={styles.root}>
      {label && (
        <Label required={required} htmlFor={inputId}>
          {label}
        </Label>
      )}
      <Input
        required={required}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
        id={inputId}
        contentAfter={contentAfter}
      />
    </div>
  );
};
