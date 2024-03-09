import { useEffect, useState } from "react";
import { getUsers, pageSizes, searchItems } from "./data";
import { IUser } from "./types";
import { ITableColumn, SortState } from "../table/types";
import {
  Button,
  OptionOnSelectData,
  SelectionEvents,
  SortDirection,
  TableCell,
  TableHeaderCell,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { EventType } from "../types/EventType";
import { TableComponent } from "../table";
import { columns } from "./columns";
import { Pagination } from "../pagination";
import { sortItems } from "../util";
import { Delete24Regular, DocumentEdit24Regular } from "@fluentui/react-icons";
const useStyles = makeStyles({
  container: {
    ...shorthands.padding("1rem"),
  },
  buttons: {
    display: "flex",
    ...shorthands.gap("15px"),
  },
});

export const Users: React.FC = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentData, setCurrentData] = useState<IUser[]>([]);
  const [nextPage, setNextPage] = useState<string | null | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setPrevPage] = useState<string | null | undefined>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<string[]>(["10"]);
  const [value, setValue] = useState("");
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
  const additionalColumns = (row: IUser): React.ReactNode => {
    return (
      <TableCell>
        <div className={classes.buttons}>
          <Button
            title={"Edit"}
            icon={<DocumentEdit24Regular />}
            onClick={() => {
              onRowEvent(EventType.View, row);
            }}
          />
          <Button
            title={"Delete"}
            icon={<Delete24Regular />}
            onClick={() => {
              onRowEvent(EventType.Delete, row);
            }}
          />
        </div>
      </TableCell>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = getUsers(50);
      setUsers(data);
      setLoader(false);
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
      setPageSize([data.optionValue]);
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

  const onSearchChange = (_name: string, val: string): void => setValue(val);

  useEffect(() => {
    let filteredData: IUser[] = [];
    if (value.trim().length > 0)
      filteredData = sortItems(
        searchItems(value.toLowerCase().trim(), users, [
          "name",
          "email",
          "city",
          "country",
          "zipCode",
          "province",
        ]),
        sortState
      );
    filteredData = sortItems(users, sortState);
    setCurrentData(filteredData);
  }, [value, users, sortState]);
  const additionalHeader = (): React.ReactNode => {
    return (
      <TableHeaderCell style={{ width: "70px" }} sortable={false}>
        {"Actions"}
      </TableHeaderCell>
    );
  };
  const page_size = Number(pageSize[0]);
  const filtered = currentData.slice((page - 1) * page_size, page * page_size);
  //   console.log(
  //     filtered,
  //     `page_size:${page_size} page: ${page}`,
  //     currentData,
  //     users
  //   );
  return (
    <div className={classes.container}>
      {" "}
      <TableComponent
        columns={columns}
        rows={filtered}
        sortState={sortState}
        onSort={onSort}
        keyColumn="id"
        search={value}
        onSearchChange={onSearchChange}
        isLoading={loader}
        computedActions={additionalColumns}
        additionalColumns={1}
        computedHeaders={additionalHeader}
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
