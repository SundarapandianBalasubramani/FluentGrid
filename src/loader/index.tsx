import { Spinner, makeStyles } from "@fluentui/react-components";
import * as React from "react";

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    position: "fixed",
    display: "flex",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
  },
});

export const Loader: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Spinner
        size="extra-large"
        style={{ margin: 100 }}
        label={"Loading..."}
      />
    </div>
  );
};
