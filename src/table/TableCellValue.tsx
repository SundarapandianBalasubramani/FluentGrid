/* eslint-disable @typescript-eslint/no-explicit-any */
import {  
  TableCell,
  TableCellLayout,
} from "@fluentui/react-components";
import { IColumn,  ColumnType } from "./types";
import * as React from "react";
import { EventType } from "../types/EventType";
import { formatDate } from "./util";

export const TableCellValue: React.FC<{
  obj: any;
  column: IColumn;
  icon?: (row: any) => any;
  onEvent?: (type: EventType, row: any) => void;
  computed?: (column: IColumn, row: any) => any;
}> = ({ obj, column, icon, computed }) => {
  let val = obj[column.columnKey];
  if (column.columnKey.indexOf(".") > 0) {
    const nested = column.columnKey.split(".");
    let curr = obj;
    nested.forEach((ele) => {
      if (ele in curr) curr = curr[ele];
    });
    if (curr) val = curr;  
  }
  if (Array.isArray(val)) val = val.join(", ");  
  if (column.computed && computed) val = computed(column, obj);
  if (column.type === ColumnType.date) val = formatDate(val);
  if (column.options) val = column.options[val];
  const truncate = "truncate" in column ? column.truncate : true;
  return (
    <TableCell>
      <TableCellLayout
        truncate={truncate}
        {...(column.shwTitle ? { title: val } : {})}
        {...(column.icon && icon ? { media: icon(obj) } : {})}
      >
        {val}
      </TableCellLayout>
    </TableCell>
  );
};
