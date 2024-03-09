import {
  Spinner,
  TableCell,
  TableRow,
  makeStyles,
} from "@fluentui/react-components";
import * as React from "react";
const useStyles = makeStyles({
  row: {
    height: "400px",
  },
  cell: {
    textAlign: "center",
  },
});
export const TableLoader: React.FC<{ colSpan?: number }> = ({ colSpan }) => {
  const classes = useStyles();
  return (
    <TableRow className={classes.row}>
      <TableCell className={classes.cell} colSpan={colSpan}>
        <Spinner size="small" label={"Loading..."} />
      </TableCell>
    </TableRow>
  );
};
