import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    height: "48px",
    width: "100%",
    backgroundColor: "#0F6CBD",
    position: "sticky",
    top: "0px",
    zIndex: 200,
  },
});
export const Header: React.FC = () => {
  const classes = useStyles();
  return <header className={classes.root}></header>;
};
