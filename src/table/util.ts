import { SortDirection } from "@fluentui/react-components";
import { IColumn, SortState } from "./types";

export const getHeaderSortProps = (
  column: IColumn,
  sortState?: SortState,
  className?: string,
  onSort?: (column: IColumn, e?: React.MouseEvent) => void
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
