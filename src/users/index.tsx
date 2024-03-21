import { useEffect, useState } from "react";
import { getUsers, pageSizes } from "./data";
import { IUser } from "./types";
import { ITableColumn, SortState } from "../table/types";
import {
  OptionOnSelectData,
  SelectionEvents,
  SortDirection,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { EventType } from "../types/EventType";
import { EnhancedTable } from "../table";
import { columns } from "./columns";
import { Pagination } from "../pagination";

const useStyles = makeStyles({
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  buttons: {
    display: "flex",
    ...shorthands.gap("15px"),
  },
});

export const Users: React.FC = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<IUser[]>([]);
  const [nextPage, setNextPage] = useState<string | null | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setPrevPage] = useState<string | null | undefined>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number[]>([10]);
  const [loader, setLoader] = useState(true);
  const [sortState, setSortState] = useState<SortState>({
    sortDirection: undefined,
    sortColumn: undefined,
  });
  const onRowEvent = (evt: EventType, row: IUser): void => {
    console.log(evt, row);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setDirection] = useState<EventType>(EventType.None);

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = getUsers(50);
      setUsers(data);
      setLoader(false);
      console.log(data);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSort = (column: ITableColumn, _e?: React.MouseEvent): void => {
    const direction: SortDirection =
      sortState.sortDirection === "ascending" ? "descending" : "ascending";
    console.log(direction, column.label);
    setSortState({
      sortColumn: column.columnKey,
      sortDirection: direction,
      type: column.type,
    });
    setPage(1);
    setDirection(EventType.None);
    setNextPage(null);
    setPrevPage(null);
  };

  const onOptionSelect = (
    _event: SelectionEvents,
    data: OptionOnSelectData
  ): void => {
    if (data.optionValue) {
      setPageSize([Number(data.optionValue)]);
      setPage(1);
      setDirection(EventType.None);
      setNextPage(null);
      setPrevPage(null);
    }
  };

  const onPageChange = (event: EventType): void => {
    setDirection(event);
    if (event === EventType.Next) setPage((p) => p + 1);
    else setPage((p) => p - 1);
  };

  return (
    <div className={classes.container}>
      <Pagination
        hasNext={!nextPage}
        pageNo={page}
        pageSizes={pageSizes}
        pageSize={pageSize}
        onSizeChange={onOptionSelect}
        onPageChange={onPageChange}
      />
      <EnhancedTable
        columns={columns}
        rows={users}
        sortState={sortState}
        onSort={onSort}
        keyColumn="id"
        isLoading={loader}
        additionalColumns={1}
        additionalActions
        additionalHeaders
        canDelete={true}
        canEdit={true}
        onEvent={onRowEvent}
      />
      <Pagination
        hasNext={!nextPage}
        pageNo={page}
        pageSizes={pageSizes}
        pageSize={pageSize}
        onSizeChange={onOptionSelect}
        onPageChange={onPageChange}
      />
    </div>
  );
};
