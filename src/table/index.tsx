import {
  TableBody,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

import {  TableCellValue } from "./TableCellValue";
import { ITableProps } from "./types";
import * as React from "react";
import { NoRecord } from "./NoRecord";

import { TableLoader } from "./TableLoader";
import { AdditionalHeaders } from "../columns/AdditionalHeaders";
import { AdditionalColumns } from "../columns/AdditionalColumns";
import { getHeaderSortProps } from "./util";

const useStyles = makeStyles({
  root: {
    marginTop: "20px",
    overflowX: "auto",
    maxWidth: "99%",
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

export const EnhancedTable: React.FC<ITableProps> = (props) => {
  const styles = useStyles();
  const {
    columns,
    rows,
    sortState,
    onSort,
    icon,
    keyColumn,
    onEvent,
    computed,
    isLoading,
    canDelete,
    canEdit,
    showActions,
    customAction,
    canView,
    colSpan,
  } = props;
  return (
    <div className={styles.root}>
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
            {showActions && <AdditionalHeaders />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((item) => (
            <TableRow key={item[keyColumn]}>
              {columns.map((column, i) => (
                <TableCellValue
                  key={String(item[keyColumn] + i)}
                  obj={item}
                  column={column}
                  icon={icon}
                  onEvent={onEvent}
                  computed={computed}
                />
              ))}
              {showActions && (
                <AdditionalColumns
                  row={item}
                  canDelete={canDelete}
                  canEdit={canEdit}
                  canView={canView}
                  onRowEvent={onEvent}
                />
              )}
              {!showActions && customAction}
            </TableRow>
          ))}
          {!isLoading && rows.length === 0 && <NoRecord colSpan={colSpan} />}
          {isLoading && <TableLoader colSpan={colSpan} />}
        </TableBody>
      </Table>
    </div>
  );
};
