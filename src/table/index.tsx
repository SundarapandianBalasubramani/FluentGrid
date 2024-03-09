import {
  TableBody,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  makeStyles,
  tokens,
  shorthands,
} from "@fluentui/react-components";

import { getHeaderSortProps, GetTableCellValue } from "./util";
import { ITableProps } from "./types";
import * as React from "react";
import { NoRecord } from "./NoRecord";

import { Search } from "../inputs/Search";
import { TableLoader } from "./TableLoader";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    marginTop: "20px",
  },
  search: {
    alignSelf: "end",
  },
  head: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  cell: {
    ":active": {
      backgroundColor: tokens.colorBrandBackgroundPressed,
    },
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
});

export const TableComponent: React.FC<ITableProps> = (props) => {
  const styles = useStyles();
  const {
    columns,
    rows,
    sortState,
    onSort,
    icon,
    keyColumn,
    onEvent,
    computedActions,
    computedHeaders,
    computed,
    search,
    onSearchChange,
    additionalColumns = 0,
    isLoading,
  } = props;
  return (
    <div className={styles.root}>
      {typeof search === "string" && (
        <div className={styles.search}>
          <Search value={search} onChange={onSearchChange} />
        </div>
      )}
      <Table sortable>
        <TableHeader>
          <TableRow className={styles.head}>
            {columns.map((column) => (
              <TableHeaderCell
                style={{ width: column.width }}
                key={column.columnKey}
                sortable
                {...getHeaderSortProps(column, sortState, styles.cell, onSort)}
              >
                {column.label}
              </TableHeaderCell>
            ))}
            {computedHeaders?.()}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((item) => (
            <TableRow key={item[keyColumn]}>
              {columns.map((column) => (
                <GetTableCellValue
                  key={item[keyColumn]}
                  obj={item}
                  column={column}
                  icon={icon}
                  onEvent={onEvent}
                  computed={computed}
                />
              ))}
              {computedActions?.(item)}
            </TableRow>
          ))}
          {!isLoading && rows.length === 0 && (
            <NoRecord colSpan={columns.length + additionalColumns} />
          )}
          {isLoading && (
            <TableLoader colSpan={columns.length + additionalColumns} />
          )}
        </TableBody>
      </Table>
    </div>
  );
};
