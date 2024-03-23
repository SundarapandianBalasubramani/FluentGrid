import React from "react";
import { TextBox } from "../inputs/TextBox";
import { FieldType, IField } from "./types";
import { DatePickerComponent } from "../inputs/DatePickerComponent";
import { ComboBoxComponent } from "../inputs/ComboBoxComponent";
import { ICustomComboBoxState } from "../inputs/types";

export interface IFieldsProps {
  data: IField[];
  values: IValue;

  onChange: (name: string, value: unknown, data?: unknown) => void;
}

export interface IFieldProps {
  data: IField;
  value: unknown;

  onChange: (name: string, value: unknown, data?: unknown) => void;
}

export interface IValue {
  [key: string]: boolean | null | undefined | string | number;
}

export const Fields: React.FC<IFieldsProps> = ({ data, values, onChange }) => {
  return (
    <>
      {data.map((d) => (
        <Field
          key={d.name}
          data={d}
          onChange={onChange}
          value={values[d.name]}
        />
      ))}
    </>
  );
};

export const Field: React.FC<IFieldProps> = ({ data, value, onChange }) => {
  switch (data.type) {
    case FieldType.Text:
    case FieldType.Number:
      return (
        <TextBox
          name={data.name}
          value={value as string}
          onChange={onChange}
          label={data.label}
        ></TextBox>
      );
    case FieldType.Date:
      return (
        <DatePickerComponent
          name={data.name}
          value={value as string}
          onChange={onChange}
          label={data.label}
        />
      );
    case FieldType.Combobox:
      return (
        <ComboBoxComponent
          name={data.name}
          value={value as ICustomComboBoxState}
          onChange={onChange}
          label={data.label}
        />
      );

    default:
      return (
        <span>
          {"Not yet implemented for this field '" +
            data.type +
            "' " +
            data.label}
        </span>
      );
  }

  return <></>;
};
