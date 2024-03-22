/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortDirection } from "@fluentui/react-components";

import { EventType } from "../types/EventType";
import { FluentIcon } from "@fluentui/react-icons";
export enum ColumnType {
  string = "string",
  number = "number",
  date = "date",
  link = "link",

}


export interface IColumn {
  columnKey: string;
  label: string;
  sortable?: boolean;
  icon?: boolean;
  options?: any;
  computed?: boolean;
  width?: string;
  type?: ColumnType;
  route?: string;
  truncate?: boolean;
  shwTitle?: boolean;
}

export type SortState = {
  sortDirection: SortDirection | undefined;
  sortColumn: string | undefined;
  type?: ColumnType;
};

export interface IRowEvent {
  event: EventType;
  icon: FluentIcon;
  title: string;
}

export interface ITableProps {
  columns: IColumn[];
  rows: any[];
  sortState?: SortState;
  onSort?: (column: IColumn, e?: React.MouseEvent) => void;
  icon?: (row: any) => any;
  keyColumn: string;
  computed?: (column: IColumn, row: any) => any;
  onEvent?: (type: EventType, row: any) => void;
  showActions?: boolean;
  isLoading?: boolean;
  canEdit?: boolean;

  canDelete?: boolean;

  canView?: boolean;

  customAction?: React.ReactNode;

  colSpan: number;
}

export interface IValue{
  [key: string] : undefined | number | string | object | null | IValue
}