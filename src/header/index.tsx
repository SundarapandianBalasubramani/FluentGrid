import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    height: "48px",
    width: "100%",
    backgroundColor: "#0F6CBD",
  },
  header: {
    width: "100%"  
  },
});
export const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}></div>
    </div>
  );
};
