import * as React from "react";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Field, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    rowGap: "15px",
  },
  control: {
    maxWidth: "100%",
  },
});

export const DatePickerComponent: React.FC<{
  label?: string;
  name: string;
  value: Date | null | undefined | string;
  onChange: (name: string, value: unknown, other?: unknown) => void;
}> = ({ label, name, onChange, value }) => {
  const styles = useStyles();

  const onSelectDate = (date: Date | null | undefined): void => {
    onChange(name, date);
  };

  return (
    <div className={styles.root}>
      <Field label={label}>
        <DatePicker
          value={value as Date}
          onSelectDate={onSelectDate}
          placeholder="Select a date..."
          className={styles.control}
        />
      </Field>
    </div>
  );
};
