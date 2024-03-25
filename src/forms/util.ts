import { FieldType, IField } from "../fields/types";
import { ICustomComboBoxState } from "../inputs/types";
import { IUser } from "../users/types";

type UserValidaton = {
  user: IUser;
  hasValidationError: boolean;
  fields: IField[];
};
export const getUserDetails = (fields: IField[]): UserValidaton => {
  const user: Partial<IUser> = {};
  let hasValidationError = false;
  fields.forEach((field) => {
    let val = field.value;
    if (field.name === "name" || field.name === "email") {
      if (!(typeof field.value === "string" && field.value.length > 0)) {
        hasValidationError = true;
        field.validationState = "warning";
        field.validationMessage = "Please fill the value";
      }
    }
    if (field.type === FieldType.Combobox && typeof field.value === "object") {
      val = (field.value as ICustomComboBoxState).selectedOptions;
    } else if (field.type === FieldType.Date && typeof field.value === "object")
      val = (field.value as Date).toISOString();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (user as any)[field.name] = val;
  });
  return { user: user as IUser, hasValidationError, fields };
};
