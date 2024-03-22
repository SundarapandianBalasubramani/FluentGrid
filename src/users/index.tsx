import { useEffect, useState } from "react";
import { IPager, IUser } from "./types";
import { IColumn, SortState } from "../table/types";
import {
  SliderOnChangeData,
  SortDirection,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { EventType } from "../types/EventType";
import { EnhancedTable } from "../table";
import { columns } from "./columns";
import { Pagination } from "../pagination";
import { useGetUsersQuery } from "../store/user";

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

const _pager: IPager = {
  page: 1,
  size: 10,
  sort: [],
  filter: [],
};

export const Users: React.FC = () => {
  const classes = useStyles();
  const [pager, setPager] = useState<IPager>(structuredClone(_pager));
  const [details, setDetails] = useState<{ pages: number; total: number }>({
    pages: 0,
    total: 0,
  });
  const { isLoading, data } = useGetUsersQuery(pager);
  const [sortState, setSortState] = useState<SortState>({
    sortDirection: undefined,
    sortColumn: undefined,
  });

  useEffect(() => {
    if (data) setDetails({ pages: data.pages, total: data.items });
  }, [data]);

  const onRowEvent = (evt: EventType, row: IUser): void => {
    console.log(evt, row);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSort = (column: IColumn, _e?: React.MouseEvent): void => {
    let direction: SortDirection =
      sortState.sortDirection === "descending" ? "ascending" : "descending";
    if (sortState.sortColumn !== column.columnKey) direction = "ascending";
    setSortState({
      sortColumn: column.columnKey,
      sortDirection: direction,
      type: column.type,
    });
    const sortby =
      direction === "descending" ? `-${column.columnKey}` : column.columnKey;
    setPager((prev) => ({ ...prev, page: 1, sort: [sortby] }));
  };

  const onPageChange = (current: number): void =>
    setPager((prev) => ({ ...prev, page: current }));

  const onSizeChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    _data: SliderOnChangeData
  ) => {
    setPager((prev) => ({ ...prev, size: _data.value, page: 1 }));
  };

  return (
    <div className={classes.container}>
      <Pagination
        page={pager.page}
        pages={details.pages}
        size={pager.size}
        total={details.total}
        onSizeChange={onSizeChange}
        onPageChange={onPageChange}
      />
      <EnhancedTable
        columns={columns}
        rows={data?.data ?? []}
        sortState={sortState}
        onSort={onSort}
        keyColumn="id"
        isLoading={isLoading}
        showActions
        canDelete
        canEdit
        canView
        onEvent={onRowEvent}
        colSpan={columns.length + 1}
      />
      <Pagination
        page={pager.page}
        pages={details.pages}
        size={pager.size}
        onSizeChange={onSizeChange}
        onPageChange={onPageChange}
        total={details.total}
      />
    </div>
  );
};
