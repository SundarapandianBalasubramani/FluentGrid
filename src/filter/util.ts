import { FieldType, IField } from "../fields/types";
import { ICustomComboBoxState } from "../inputs/types";

export const getFilter = (fields: IField[]) => {
  const filters: IField[] = [];
  fields.forEach((fld) => {
    let canAdd = false;
    if (fld.type === FieldType.Combobox) {
      const combo = fld.value as ICustomComboBoxState;
      if (combo?.selectedOptions.length > 0) canAdd = true;
    } else if (fld.type === FieldType.Date && fld.value) canAdd = true;
    else if (typeof fld.value === "string" && fld.value.length > 0)
      canAdd = true;
    else if (typeof fld.value === "number") canAdd = true;
    if (canAdd) filters.push(fld);
  });
  return filters;
};

export const getFieldValue = (fld: IField): string => {
  let value = "";
  let op = " = ";
  if (fld.type === FieldType.Combobox) {
    const combo = fld.value as ICustomComboBoxState;
    if (combo?.selectedOptions.length > 0)
      value = combo?.selectedOptions.join(", ");
  } else if (fld.type === FieldType.Date && fld.value) {
    value = (fld.value as Date).toDateString();
    op = " = ";
  } else if (typeof fld.value === "string" && fld.value.length > 0)
    value = fld.value;
  else if (typeof fld.value === "number") value = fld.value.toString();
  if (fld.type === FieldType.Number) op = " = ";
  return op + value;
};
