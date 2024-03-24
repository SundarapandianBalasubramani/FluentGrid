export interface IField {
  name: string;
  label?: string;

  text?: string;

  type: FieldType;

  options?: string[];

  value: unknown;

  validationState?: "error" | "warning" | "success" | "none";
  validationMessage?: string;
}

export enum FieldType {
  Text = "Text",
  Number = "Number",
  Link = "Link",

  MultiText = "MultiText",

  Date = "Date",

  DropDown = "DropDown",

  DropDownMulti = "DropDownMulti",

  Combobox = "Combobox",
}
