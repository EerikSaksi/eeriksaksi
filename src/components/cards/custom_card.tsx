import React, { forwardRef } from 'react';
import { useMediaQuery, Container, CardProps, useTheme, Paper } from '@material-ui/core';

const FancyButton = React.forwardRef<unknown, { children: React.ReactNode; style?: React.CSSProperties; firstElement?: boolean }>(({ children, firstElement, style }, ref) => {
  const theme = useTheme();
  const notPhone = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Container >
      <Paper ref={ref} style={notPhone ? { marginTop: 'calc(50vh - 56px)', transform: 'translateY(-50%)', marginBottom: 'calc(50vh - 56px)', scrollSnapAlign: 'center', ...style } : {marginBottom: theme.spacing(10)}}>
        {children}
      </Paper>
    </Container>
  );
});

export default FancyButton;
