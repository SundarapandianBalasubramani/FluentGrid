/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortDirection } from "@fluentui/react-components";

import { EventType } from "../types/EventType";
import { FluentIcon } from "@fluentui/react-icons";
export enum TableColumnType {
  string,
  number,
  date,
  link,
}

export interface ITableColumn {
  columnKey: string;
  label: string;
  sortable?: boolean;
  icon?: boolean;
  options?: any;
  computed?: boolean;
  width?: string;
  type?: TableColumnType;
  route?: string;
  truncate?: boolean;
  shwTitle?: boolean;
}

export type SortState = {
  sortDirection: SortDirection | undefined;
  sortColumn: string | undefined;
  type?: TableColumnType;
};

export interface IRowEvent {
  event: EventType;
  icon: FluentIcon;
  title: string;
}

export interface ITableProps {
  columns: ITableColumn[];
  rows: any[];
  sortState?: SortState;
  onSort?: (column: ITableColumn, e?: React.MouseEvent) => void;
  icon?: (row: any) => any;
  keyColumn: string;
  computed?: (column: ITableColumn, row: any) => any;
  onEvent?: (type: EventType, row: any) => void;
  additionalActions?: boolean;
  additionalHeaders?: boolean;

  additionalColumns?: number;
  isLoading?: boolean;
  canEdit?: boolean;

  canDelete?: boolean;
}
