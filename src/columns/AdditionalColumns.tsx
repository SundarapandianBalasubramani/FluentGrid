import {
  Button,
  makeStyles,
  shorthands,
  TableCell,
} from "@fluentui/react-components";
import {
  Delete24Regular,  
  Edit24Regular,
  Eye24Filled,
} from "@fluentui/react-icons";
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

  canView?: boolean;
}
export const AdditionalColumns: React.FC<AdditionalColumnProps> = ({
  onRowEvent,
  row,
  canDelete,
  canEdit,
  canView,
}) => {
  const classes = useStyles();
  return (
    <TableCell>
      <div className={classes.buttons}>
        {canView && (
          <Button
            title={"View"}
            icon={<Eye24Filled />}
            onClick={() => {
              onRowEvent?.(EventType.View, row);
            }}
          />
        )}
        {canEdit && (
          <Button
            title={"Edit"}
            icon={<Edit24Regular />}
            onClick={() => {
              onRowEvent?.(EventType.Edit, row);
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
