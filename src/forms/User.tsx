import { useMemo, useState } from "react";
import { OptionOnSelectData, makeStyles } from "@fluentui/react-components";
import { Dlg } from "../Dlg";
import { FieldType, IField } from "../fields/types";
import { Field } from "../fields";
import { EventType } from "../types/EventType";
import { ICustomComboBoxState } from "../inputs/types";

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
  onSave: (event: EventType, fields: IField[]) => void;
}> = ({ data, onSave }) => {
  const details = useMemo(() => {
    const info = { Ok: "Add User" };
    const fld = data.find((d) => d.name === "id");
    if (!isNaN(parseFloat(fld?.value as string))) {
      info.Ok = "Update User";
    }
    return info;
  }, [data]);

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

  const onClick = (event: EventType) => {
    onSave(event, data);
  };

  return (
    <Dlg
      open={true}
      title={"User"}
      onClick={onClick}
      close="Close"
      ok={details.Ok}
    >
      <div className={styles.fields}>
        {fields.slice(1).map((d) => (
          <Field data={d} onChange={onChange} key={d.name} value={d.value} />
        ))}
      </div>
    </Dlg>
  );
};
