import React, { forwardRef } from 'react';
import { Grid, useTheme, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6),
    },
    boxShadow: theme.shadows[24]
  },
}));

const CustomCard = forwardRef<unknown, { children: React.ReactNode; style?: React.CSSProperties; containerStyle?: React.CSSProperties }>(({ children, style, containerStyle }, ref) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid alignItems='center' container style={{ height: `calc(100vh - ${theme.spacing(6) + 64}px)`, maxWidth: 'calc(100% - 350px)',  marginBottom: theme.spacing(6) + 64, scrollSnapAlign: 'center', scrollSnapStop: 'always', ...containerStyle }}>
      <Grid item xs={12}>
        <Paper className={classes.paper} ref={ref} style={{ alignSelf: 'center', ...style }}>
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
});

export default CustomCard;
