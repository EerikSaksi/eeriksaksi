import React, { forwardRef } from 'react';
import { Container,  CardProps, useTheme, Paper } from '@material-ui/core';
const FancyButton = React.forwardRef<unknown, CardProps>((props, ref) => {
  const theme = useTheme();

  return (
    <Container style = {{  marginTop:'calc(50vh - 64px)', transform: 'translateY(-50%)', }}>
      <Paper ref={ref}  >
        {props.children}
      </Paper>
  </Container>
  );
});

export default FancyButton;
