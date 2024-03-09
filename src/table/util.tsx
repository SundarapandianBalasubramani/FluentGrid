/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SortDirection,
  TableCell,
  TableCellLayout,
} from "@fluentui/react-components";
import { ITableColumn, SortState, TableColumnType } from "./types";
import * as React from "react";
import { EventType } from "../types/EventType";

export const getHeaderSortProps = (
  column: ITableColumn,
  sortState?: SortState,
  className?: string,
  onSort?: (column: ITableColumn, e?: React.MouseEvent) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  if (column.sortable) {
    let sort: SortDirection | undefined = undefined;
    if (sortState?.sortColumn === column.columnKey)
      sort = sortState.sortDirection;
    return {
      onClick: () => onSort?.(column),
      sortDirection: sort,
      className,
    };
  }
  return { sortable: false };
};

export const formatDate = (value: string): string => {
  const date = new Date(value);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return month + " " + day + ", " + year;
};

export const GetTableCellValue: React.FC<{
  obj: any;
  column: ITableColumn;
  icon?: (row: any) => any;
  onEvent?: (type: EventType, row: any) => void;
  computed?: (column: ITableColumn, row: any) => any;
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
  if (column.computed && computed) val = computed(column, obj);
  if (column.type === TableColumnType.date) val = formatDate(val);
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
