import {
  Button,  
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuProps,
  PositioningImperativeRef,  
  TableCell,  
  useRestoreFocusTarget,
} from "@fluentui/react-components";
import {
  Delete24Regular,
  Edit24Regular,
  Eye24Filled,
  MoreHorizontalFilled,
} from "@fluentui/react-icons";
import { EventType } from "../types/EventType";
import { useEffect, useRef, useState } from "react";
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const positioningRef = useRef<PositioningImperativeRef>(null);
  const [open, setOpen] = useState(false);
  const onOpenChange: MenuProps["onOpenChange"] = (e, data) => {
    // do not close menu as an outside click if clicking on the custom trigger/target
    // this prevents it from closing & immediately re-opening when clicking custom triggers
    if (data.type === "clickOutside" && e.target === buttonRef.current) {
      return;
    }

    setOpen(data.open);
  };

  useEffect(() => {
    if (buttonRef.current) {
      positioningRef.current?.setTarget(buttonRef.current);
    }
  }, [buttonRef, positioningRef]);

  const restoreFocusTargetAttribute = useRestoreFocusTarget();

  return (
    <TableCell>
      <Button
        {...restoreFocusTargetAttribute}
        ref={buttonRef}
        appearance="subtle"
        title={"Actions"}
        icon={<MoreHorizontalFilled />}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      />
      <Menu
        open={open}
        onOpenChange={onOpenChange}
        positioning={{ positioningRef }}
      >
        <MenuPopover>
          <MenuList>
            {canView && (
              <MenuItem
                icon={<Eye24Filled />}
                onClick={() => {
                  onRowEvent?.(EventType.View, row);
                }}
              >
                View
              </MenuItem>
            )}
            {canEdit && (
              <MenuItem
                icon={<Edit24Regular />}
                onClick={() => {
                  onRowEvent?.(EventType.Edit, row);
                }}
              >
                Edit
              </MenuItem>
            )}
            {canDelete && (
              <MenuItem
                icon={<Delete24Regular />}
                onClick={() => {
                  onRowEvent?.(EventType.Delete, row);
                }}
              >
                Delete
              </MenuItem>
            )}
          </MenuList>
        </MenuPopover>
      </Menu>
    </TableCell>
  );
};
