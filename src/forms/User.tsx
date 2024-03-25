import { useState } from "react";
import { OptionOnSelectData, makeStyles } from "@fluentui/react-components";
import { Dlg } from "../dialog";
import { FieldType, IField } from "../fields/types";
import { Field } from "../fields";
import { EventType } from "../types/EventType";
import { ICustomComboBoxState } from "../inputs/types";
import { useAddUserMutation, useUpdateUserMutation } from "../store/user";
import { getUserDetails } from "./util";
import { useGetFormInfo } from "./useFormInfo";

const useStyles = makeStyles({
  filter: {
    display: "flex",
    justifyContent: "end",
    marginTop: "20px",
    marginRight: "20px",
    columnGap: "20px",
  },
  fields: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    marginBottom: "20px",
    rowGap: "20px",
  },
  tagsList: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: "10px",
  },
});
export const User: React.FC<{
  data: IField[];
  onSave: (event: EventType) => void;
}> = ({ data, onSave }) => {
  const [addUser] = useAddUserMutation();

  const [updateUser] = useUpdateUserMutation();

  const details = useGetFormInfo(data);

  const [fields, setFields] = useState(data.filter((d) => d.name !== "id"));

  const styles = useStyles();

  const onChange = (name: string, value: string | unknown, other?: unknown) => {
    setFields((prev) => {
      const newFields = [...prev];
      const fld = newFields.find((f) => f.name === name);
      if (fld) {
        if (fld.type === FieldType.Combobox) {
          const val = fld.value as ICustomComboBoxState;
          const key = other as keyof ICustomComboBoxState;
          const comboval = value as OptionOnSelectData;
          if (key === "selected") {
            val.selectedOptions = comboval.selectedOptions;
            val.inputValue = val.multiple
              ? comboval.selectedOptions.join(", ")
              : comboval.optionText!;
            val.selected = {
              id: comboval.optionValue!,
              value: comboval.optionText!,
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } else (val as any)[key] = value;
        } else fld.value = value;
      }
      return newFields;
    });
  };

  const onClick = async (e: EventType) => {    
    if (e === EventType.Ok) {
      const info = getUserDetails(structuredClone(fields));      
      if (!info.hasValidationError) {
        if (details.id > 0) await addUser(info.user);
        else await updateUser(info.user);
        onSave(e);
      } else setFields(info.fields);
    } else onSave(e);
  };

  return (
    <Dlg
      open={true}
      title={"User"}
      onClick={onClick}
      close="Close"
      ok={`${details.Ok} User`}
    >
      <div className={styles.fields}>
        {fields.slice(0).map((d) => (
          <Field data={d} onChange={onChange} key={d.name} value={d.value} />
        ))}
      </div>
    </Dlg>
  );
};
