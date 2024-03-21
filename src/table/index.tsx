import {
  TableBody,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

import { getHeaderSortProps, GetTableCellValue } from "./util";
import { ITableProps } from "./types";
import * as React from "react";
import { NoRecord } from "./NoRecord";

import { TableLoader } from "./TableLoader";
import { AdditionalHeaders } from "../columns/AdditionalHeaders";
import { AdditionalColumns } from "../columns/AdditionalColumns";

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
    additionalColumns = 0,
    isLoading,
    canDelete,
    canEdit,
    additionalActions,
    additionalHeaders,
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
            {additionalHeaders && <AdditionalHeaders />}
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
              {additionalActions && (
                <AdditionalColumns
                  row={item}
                  canDelete={canDelete}
                  canEdit={canEdit}
                  onRowEvent={onEvent}
                />
              )}
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
