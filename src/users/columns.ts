import { ITableColumn, TableColumnType } from "../table/types";

export const columns: ITableColumn[] = [
  {
    columnKey: "id",
    label: "ID",
    width: "40px",
    sortable: true,
    type: TableColumnType.number,
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
    type: TableColumnType.number,
  },
];
