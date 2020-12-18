import React, { forwardRef } from 'react';
import { Grid, useTheme, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6),
      width: '60%'
    },
    boxShadow:  '0px 22px 30px -14px rgba(0,0,0,0.8),0px 48px 76px 6px rgba(0,0,0,0.56),0px 18px 92px 16px rgba(0,0,0,0.48)'
  },
}));


const CustomCard = forwardRef<unknown, { children: React.ReactNode; style?: React.CSSProperties; containerStyle?: React.CSSProperties }>(({ children, style, containerStyle }, ref) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid alignItems='center' container style={{ height: '100vh', scrollSnapAlign: 'center', scrollSnapStop: 'always', ...containerStyle, alignItems: 'center', justifyContent: 'center', }}>
      <Paper className={classes.paper} ref={ref} style={{ alignSelf: 'center', width: '80%', maxWidth: '80%',   ...style, }}>
        {children}
      </Paper>
    </Grid>
  );
});

export default CustomCard;
