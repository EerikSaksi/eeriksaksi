import React, { forwardRef } from 'react';
import { Grid, useTheme, Paper } from '@material-ui/core';
const CustomCard = React.forwardRef<unknown, { children: React.ReactNode; style?: React.CSSProperties, containerStyle?: React.CSSProperties }>(({ children, style, containerStyle  }, ref) => {
  const theme = useTheme();
  return (
    <Grid alignItems='center' container style={{  height: `calc(100vh - ${theme.spacing(6) + 64}px)`, marginBottom: theme.spacing(6) + 64,  minWidth: '100%',  scrollSnapAlign: 'center',  scrollSnapStop: 'always', ...containerStyle }}>
      <Grid item xs={12}>
        <Paper ref={ref} style={{  alignSelf: 'center',  ...style}}>
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
});

export default CustomCard;
