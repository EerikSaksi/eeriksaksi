import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(6),
      width: "60%",
    },
    boxShadow: "0px 22px 30px -14px rgba(0,0,0,0.8),0px 48px 76px 6px rgba(0,0,0,0.56),0px 18px 92px 16px rgba(0,0,0,0.48)",
    alignSelf: "center", 
    width: "80%", 
    maxWidth: "80%",
  },
  grid: {
    height: "100vh",
    scrollSnapAlign: "center",
    scrollSnapStop: "always",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const Loading: React.FC<{ height: number | string, width?: number | string  }> = ({ height, width }) => {
  //pass height so that there will be a variable size card that is the same size as the loading content so it looks like an empty card before the content is there
  const classes = useStyles()
  return (
    <Grid alignItems="center" className={classes.grid} container >
      <Paper className={classes.paper}  style = {{height, width}}>
      </Paper>
    </Grid>
  );
};
export default Loading;
