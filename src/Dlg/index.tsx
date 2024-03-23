import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
} from "@fluentui/react-components";
import React from "react";
import { EventType } from "../types/EventType";
export const Dlg: React.FC<{
  title: string;
  children?: React.ReactNode;
  onClick: (event: EventType) => void;
  open: boolean;
}> = ({ title, children, onClick, open }) => {
  return (
    <Dialog modalType="alert" open={open}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Button
              appearance="secondary"
              onClick={() => onClick(EventType.Close)}
            >
              Close
            </Button>

            <Button appearance="primary" onClick={() => onClick(EventType.Ok)}>
              Apply Filter
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
