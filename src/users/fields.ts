import { FieldType, IField } from "../fields/types";
import { ICustomComboBoxState } from "../inputs/types";
const initial: ICustomComboBoxState = {
  loading: false,
  inputValue: "",
  selected: undefined,
  data: [
    { id: "Read", value: "Read" },
    { id: "Write", value: "Write" },
    { id: "Admin", value: "Admin" },
  ],
  unique: {},
  selectedOptions: [],
  multiple: true,
};
export const fields: IField[] = [
  {
    name: "id",
    label: "ID",
    type: FieldType.Number,
    value: "",
  },
  {
    label: "Name",
    name: "name",
    type: FieldType.Text,
    value: "",
  },
  {
    label: "Email Address",
    name: "email",
    type: FieldType.Text,
    value: "",
  },
  { label: "City", name: "city", type: FieldType.Text, value: "" },
  {
    label: "State",
    name: "province",
    type: FieldType.Text,
    value: "",
  },
  {
    label: "Country",
    name: "country",
    type: FieldType.Text,
    value: "",
  },
  {
    label: "Zip/Post",
    name: "zipCode",
    type: FieldType.Text,
    value: "",
  },
  {
    label: "Date",
    name: "date",
    type: FieldType.Date,
    value: null,
  },
  {
    label: "Roles",
    name: "roles",
    type: FieldType.Combobox,
    value: initial,
  },
];
