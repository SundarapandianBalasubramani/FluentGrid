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
import { useGetUsersQuery, useRemoveUserMutation } from "../store/user";
import { Filter } from "../filter";
import { WebContext } from "../context";
import { fields, getFilterFields } from "./fields";
import { FieldType, IField } from "../fields/types";
import { Add28Filled } from "@fluentui/react-icons";
import { User } from "../forms/User";
import { ICustomComboBoxState } from "../inputs/types";

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
  const { isLoading, data, error, refetch } = useGetUsersQuery(pager);
  const [deleteUser] = useRemoveUserMutation();

  const refetchData = () => {
    if (pager.page === 1) refetch();
    else setPager((prev) => ({ ...prev, page: 1 }));
  };

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
    console.log(structuredClone(fields));
    setShowUserForm(structuredClone(fields));
  };

  const onSave = (event: EventType) => {
    setShowUserForm(undefined);
    if (event === EventType.Ok) refetchData();
  };

  const onRowEvent = async (evt: EventType, row: IUser) => {
    console.log(evt, row);
    if (evt === EventType.Edit) {
      const newfields = structuredClone(fields);
      console.log(newfields);
      newfields.forEach((fld) => {
        const val = row[fld.name as keyof IUser];
        if (fld.type == FieldType.Date)
          fld.value = val ? new Date(val as string) : null;
        else if (fld.type == FieldType.Combobox && Array.isArray(val)) {
          const fldvalue = fld.value as ICustomComboBoxState;
          fldvalue.inputValue = val.join(", ");
          fldvalue.selectedOptions = val;
        } else fld.value = row[fld.name as keyof IUser];
      });
      setShowUserForm(newfields);
    } else if (evt === EventType.Delete) {
      const removeUser = await deleteUser(row.id);
      console.log(removeUser);
      refetchData();
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
          <Filter data={getFilterFields()} onApplyFilter={onFilter} />
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
