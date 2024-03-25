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
  close?: string;
  ok?: string;
}> = ({ title, children, onClick, open, close = "Close", ok = "Ok" }) => {
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
              {close}
            </Button>

            <Button appearance="primary" onClick={() => onClick(EventType.Ok)}>
              {ok}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
