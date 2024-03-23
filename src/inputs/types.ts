import { FieldType } from "../fields/types";

export interface IOption {
  id: string | number;
  value: string;
}

export interface IndexedOption {
  [id: number | string]: IOption;
}

export interface ICustomComboBoxState {
  loading: boolean;
  selected: IOption | undefined;
  inputValue: string;
  data: IOption[];
  unique: IndexedOption;
  selectedOptions: string[];

  multiple?: boolean;
}

export interface IComboBoxProps {
  label?: string;
  name: string;

  value: ICustomComboBoxState;
  required?: boolean;
  customExpandIcon?: React.ReactElement;
  disabled?: boolean;
  onChange?: (
    name: string,
    type: FieldType,
    val: unknown,
    data?: unknown | keyof ICustomComboBoxState
  ) => void;
  showtags?: boolean;
}
