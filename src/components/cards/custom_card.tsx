import React, { forwardRef } from 'react';
import { Grid, useMediaQuery, CardProps, useTheme, Paper } from '@material-ui/core';

const FancyButton = React.forwardRef<unknown, { children: React.ReactNode; style?: React.CSSProperties }>(({ children, style }, ref) => {
  const theme = useTheme();
  return (
    <Grid alignItems='center' container style={{  height: `calc(100vh - ${theme.spacing(6) + 64}px)`, marginBottom: theme.spacing(6) + 64,  width: '100%',  scrollSnapAlign: 'center', backgroundColor: 'blue', ...style }}>
      <Grid item xs={12}>
        <Paper ref={ref} style={{ height: 500, alignSelf: 'center',  }}>
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
});

export default FancyButton;
