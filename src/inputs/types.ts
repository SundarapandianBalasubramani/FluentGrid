export interface IOption {
  id: string | number;
  value: string;
}

export interface IndexedOption {
  [id: number | string]: IOption | IExtendedOption;
}

export interface IExtendedOption extends IOption {
  text: string;
  company_name?: string;
  email?: string;
  phone: string;
  address: string;
  company_flag?: string;
  issystemuser?: string;
  division_id?: string;
}

export interface ICustomComboBoxState {
  loading: boolean;
  selected: IOption | undefined;
  inputValue: string;
  data: IOption[] | IExtendedOption[];
  unique: IndexedOption;
  selectedOptions: string[];
}

export interface IComboBoxProps {
  label: string;
  name: string;
  value: ICustomComboBoxState;
  required?: boolean;
  multiSelect?: boolean;
  customExpandIcon?: React.ReactElement;
  disabled?: boolean;
  change?: (name: string, key: keyof ICustomComboBoxState, val: any) => void;
  showtags?: boolean;
  setlabelfor?: boolean;
}
