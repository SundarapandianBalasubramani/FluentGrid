import { useState } from "react";
import { Search } from "../inputs/Search";
import { Button, Tooltip, makeStyles } from "@fluentui/react-components";
import { Filter24Regular } from "@fluentui/react-icons";
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
});
export const Filter: React.FC<{ data: IField[] }> = ({ data }) => {
  const [fields, setFields] = useState(data);

  const styles = useStyles();
  const [filter, setFilter] = useState("");

  const [showFilter, setShowFilter] = useState(false);

  const onChange = (name: string, value: string | unknown, other?: unknown) => {
    console.log(name, value);
    if (name === "search") setFilter(name);
    else
      setFields((prev) => {
        const newFields = [...prev];
        const fld = newFields.find((f) => f.name === name);
        if (fld) {
          if (fld.type === FieldType.Combobox) {
            const val = fld.value as ICustomComboBoxState;
            const key = other as keyof ICustomComboBoxState;
            val[key] = value as never;
          }
        }
        return newFields;
      });
  };

  const onApply = (e: EventType) => {
    setShowFilter(false);
    if (e === EventType.Ok) console.log("Apply clicked");
  };

  return (
    <>
      <div className={styles.filter}>
        <div>
          <Search value={filter} onChange={onChange} />
        </div>
        <div>
          <Tooltip content="Filter" relationship="label">
            <Button
              size="medium"
              icon={<Filter24Regular />}
              onClick={() => setShowFilter(true)}
            />
          </Tooltip>
        </div>
      </div>
      {showFilter && (
        <Dlg open={showFilter} title={"Filter"} onClick={onApply}>
          <div className={styles.fields}>
            {fields.map((d) => (
              <Field
                data={d}
                onChange={onChange}
                key={d.name}
                value={d.value}
              />
            ))}
          </div>
        </Dlg>
      )}
    </>
  );
};
