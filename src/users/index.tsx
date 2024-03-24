import { useContext, useEffect, useState } from "react";
import { IPager, IUser } from "./types";
import { IColumn, SortState } from "../table/types";
import {
  Button,
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
import { Filter } from "../filter";
import { WebContext } from "../context";
import { fields } from "./fields";
import { FieldType, IField } from "../fields/types";
import { Add28Filled } from "@fluentui/react-icons";
import { User } from "../forms/User";

const useStyles = makeStyles({
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  filter: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
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
  const { notify } = useContext(WebContext);
  const classes = useStyles();
  const [pager, setPager] = useState<IPager>(structuredClone(_pager));
  const [showUserForm, setShowUserForm] = useState<IField[] | undefined>();
  const [details, setDetails] = useState<{ pages: number; total: number }>({
    pages: 0,
    total: 0,
  });
  const { isLoading, data, error } = useGetUsersQuery(pager);
  const [sortState, setSortState] = useState<SortState>({
    sortDirection: undefined,
    sortColumn: undefined,
  });

  useEffect(() => {
    if (data) setDetails({ pages: data.pages, total: data.items });
    if (error && "error" in error) notify(error.error, "error");
  }, [data, error, notify]);

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

  const onFilter = (flds: IField[]) => {
    console.log(flds);
    const filters: string[] = [];
    flds.forEach((fld) => {
      switch (fld.type) {
        case FieldType.Text:
          filters.push(`${fld.name}=${fld.value}`);
          break;
        case FieldType.Number:
          filters.push(`${fld.name}=${fld.value}`);
          break;
        case FieldType.Combobox:
          break;
        case FieldType.Date:
          filters.push(`${fld.name}=${(fld.value as Date).toISOString()}`);
          break;
      }
    });
    setPager((prev) => ({ ...prev, filter: filters }));
  };

  const onAddUser = () => {
    setShowUserForm(structuredClone(fields));
  };

  const onSave = (event: EventType, flds: IField[]) => {
    if (event === EventType.Close) setShowUserForm(undefined);
    console.log(flds);
  };

  const onRowEvent = (evt: EventType, row: IUser): void => {
    console.log(evt, row);
    if (evt === EventType.Edit) {
      const newfields = structuredClone(fields);
      newfields.forEach((fld) => {
        const val = row[fld.name as keyof IUser];
        if (fld.type !== FieldType.Combobox && fld.type !== FieldType.Date)
          fld.value = val;
        if (fld.type == FieldType.Date)
          fld.value = val ? new Date(val as string) : null;
      });
      setShowUserForm(newfields);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.filter}>
          <div>
            <Button
              icon={<Add28Filled />}
              onClick={onAddUser}
              appearance="primary"
            >
              Add User
            </Button>
          </div>
          <Filter data={structuredClone(fields)} onApplyFilter={onFilter} />
        </div>
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
      {showUserForm && <User data={showUserForm} onSave={onSave} />}
    </>
  );
};
