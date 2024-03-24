import { useState } from "react";
import { Search } from "../inputs/Search";
import {
  Button,
  OptionOnSelectData,
  Tag,
  Tooltip,
  makeStyles,
} from "@fluentui/react-components";
import { Filter24Regular } from "@fluentui/react-icons";
import { Dlg } from "../Dlg";
import { FieldType, IField } from "../fields/types";
import { Field } from "../fields";
import { EventType } from "../types/EventType";
import { ICustomComboBoxState } from "../inputs/types";
import { getFieldValue, getFilter } from "./util";

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
export const Filter: React.FC<{
  data: IField[];
  onApplyFilter: (fields: IField[]) => void;
}> = ({ data, onApplyFilter }) => {
  const [fields, setFields] = useState(data);

  const styles = useStyles();
  const [filter, setFilter] = useState("");

  const [showFilter, setShowFilter] = useState(false);

  const onChange = (name: string, value: string | unknown, other?: unknown) => {
    if (name === "search") setFilter(name);
    else
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

  const onApply = (e: EventType) => {
    setShowFilter(false);
    if (e === EventType.Ok) {
      const filters = getFilter(fields);
      onApplyFilter(filters);
    }
  };

  const onRemove = (fld: IField) => {
    let newFields: IField[] = [];
    setFields((prev) => {
      newFields = [...prev];
      const index = newFields.findIndex((f) => f.name === fld.name);
      const val: Partial<ICustomComboBoxState> =
        fld.type === FieldType.Combobox && typeof fld.value === "object"
          ? {
              ...fld.value,
            }
          : {};
      switch (fld.type) {
        case FieldType.Number:
        case FieldType.Text:
          fld.value = "";
          break;
        case FieldType.Date:
          fld.value = null;
          break;
        case FieldType.Combobox:
          val.inputValue = "";
          val.selectedOptions = [];
          val.selected = undefined;
          fld.value = val;
          break;
      }
      newFields[index] = fld;
      return newFields;
    });
    onApplyFilter(newFields);
  };

  const filters = getFilter(fields);

  return (
    <>
      <div className={styles.filter}>
        <div className={styles.tagsList}>
          {!showFilter &&
            filters.map((fld) => (
              <Tag
                shape="circular"
                onClick={() => onRemove(fld)}
                key={fld.name}
                appearance="brand"
                dismissible
                dismissIcon={{ "aria-label": "remove" }}
              >
                {`${fld.label} ${getFieldValue(fld)}`}
              </Tag>
            ))}
        </div>
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
        <Dlg
          open={showFilter}
          title={"Filter"}
          onClick={onApply}
          close="Close"
          ok="Apply Filter"
        >
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
