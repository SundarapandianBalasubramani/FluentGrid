import {
  Button,
  makeStyles,
  shorthands,
  TableCell,
} from "@fluentui/react-components";
import { Delete24Regular, DocumentEdit24Regular } from "@fluentui/react-icons";
import { EventType } from "../types/EventType";
const useStyles = makeStyles({
  buttons: {
    display: "flex",
    ...shorthands.gap("15px"),
  },
});

export interface AdditionalColumnProps {
  onRowEvent?: (event: EventType, row: unknown | object) => void;
  row: unknown | object;
  canEdit?: boolean;
  canDelete?: boolean;
}
export const AdditionalColumns: React.FC<AdditionalColumnProps> = ({
  onRowEvent,
  row,
  canDelete,
  canEdit,
}) => {
  const classes = useStyles();
  return (
    <TableCell>
      <div className={classes.buttons}>
        {canEdit && (
          <Button
            title={"Edit"}
            icon={<DocumentEdit24Regular />}
            onClick={() => {
              onRowEvent?.(EventType.View, row);
            }}
          />
        )}
        {canDelete && (
          <Button
            title={"Delete"}
            icon={<Delete24Regular />}
            onClick={() => {
              onRowEvent?.(EventType.Delete, row);
            }}
          />
        )}
      </div>
    </TableCell>
  );
};
