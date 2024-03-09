import { TableCell, TableRow, makeStyles } from "@fluentui/react-components";
import * as React from "react";
const useStyles = makeStyles({
  row: {
    height: "100px",
  },
  cell: {
    textAlign: "center",
  },
});
export const NoRecord: React.FC<{ colSpan?: number; msg?: string }> = ({
  colSpan,
  msg = "No Record(s) found",
}) => {
  const classes = useStyles();
  return (
    <TableRow className={classes.row}>
      <TableCell className={classes.cell} colSpan={colSpan}>
        {msg}
      </TableCell>
    </TableRow>
  );
};
