import React from "react";
import { Header } from "../header";
import { makeStyles } from "@fluentui/react-components";
import { LeftNav } from "../nav";
const useStyles = makeStyles({
  container: {
    display: "flex",
    overflowY: "auto",
  },
  content: {
    display: "flex",
    overflowY: "auto",
    overflowX: "hidden",
  },
});
export const Layout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.container}>
        <LeftNav />
        <div className={classes.content}>{children}</div>
      </div>
    </>
  );
};
