import * as React from "react";
import {
  Combobox,
  Option,
  makeStyles,
  Button,
  tokens,
  Field,
} from "@fluentui/react-components";
import type { ComboboxProps } from "@fluentui/react-components";
import { IComboBoxProps } from "./types";
import { Dismiss12Regular } from "@fluentui/react-icons";
import type { OptionOnSelectData } from "@fluentui/react-combobox";

const useStyles = makeStyles({
  tagsList: {
    listStyleType: "none",
    marginBottom: tokens.spacingVerticalXXS,
    marginTop: "20px",
    paddingLeft: 0,
    display: "flex",
    gridGap: tokens.spacingHorizontalXXS,
    flexWrap: "wrap",
  },
});

export const ComboBoxComponent: React.FC<IComboBoxProps> = ({
  label,
  name,
  value,
  onChange,
  disabled,
  required,
  showtags,
  customExpandIcon,
}) => {
  const styles = useStyles();
  const onOptionSelect: ComboboxProps["onOptionSelect"] = (_ev, data) =>
    onChange?.(name, data, "selected");
  const onInput = (ev: React.ChangeEvent<HTMLInputElement>): void =>
    onChange?.(name, ev.target.value, "inputValue");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onTagClick = (option: string, _index: number): void => {
    const newSelected = value.selectedOptions.filter((o) => o !== option);
    const data: OptionOnSelectData = {
      optionText: "",
      optionValue: "",
      selectedOptions: newSelected,
    };
    onChange?.(name, data, "selected");
  };

  return (
    <Field label={label} required={required}>
      <Combobox
        multiselect={value.multiple}
        disabled={disabled}
        id={name}
        name={name}
        value={value.inputValue}
        selectedOptions={value.selectedOptions}
        onInput={onInput}
        onOptionSelect={onOptionSelect}
        {...(customExpandIcon ? { expandIcon: customExpandIcon } : {})}
      >
        {value.data.map((d) => (
          <Option key={d.id} text={d.value} value={String(d.id)}>
            {d.value}
          </Option>
        ))}
      </Combobox>
      {showtags && value.selectedOptions.length ? (
        <ul className={styles.tagsList}>
          {value.selectedOptions.map((option, i) => (
            <li key={option}>
              <Button
                size="small"
                shape="circular"
                appearance="primary"
                icon={<Dismiss12Regular />}
                iconPosition="after"
                onClick={() => onTagClick(option, i)}
              >
                {value.unique[option].value}
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
    </Field>
  );
};
