import { IColumn, ColumnType } from "../table/types";

export const columns: IColumn[] = [
  {
    columnKey: "id",
    label: "ID",
    width: "40px",
    sortable: true,
    type: ColumnType.number,
  },
  {
    label: "Name",
    columnKey: "name",
    sortable: true,
    width: "200px",
    shwTitle: true,
  },
  {
    label: "Email Address",
    columnKey: "email",
    sortable: true,
    width: "180px",
    shwTitle: true,
  },
  { label: "City", columnKey: "city", width: "70px", sortable: true },
  {
    label: "State",
    columnKey: "province",
    width: "80px",
    sortable: true,
  },
  {
    label: "Country",
    columnKey: "country",
    width: "150px",
    sortable: true,
  },
  {
    label: "Zip/Post",
    columnKey: "zipCode",
    width: "100px",
    sortable: true,
    type: ColumnType.number,
  },
  {
    label: "Date",
    columnKey: "date",
    width: "80px",
    sortable: true,
    type: ColumnType.date,
  },
  {
    label: "Roles",
    columnKey: "roles",
    width: "120px",
    sortable: false,
    type: ColumnType.string,
  },
];
