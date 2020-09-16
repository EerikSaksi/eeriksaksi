import React, { forwardRef } from 'react';
import { Container,  CardProps, useTheme, Paper } from '@material-ui/core';
const FancyButton = React.forwardRef<unknown, CardProps>((props, ref) => {
  const theme = useTheme();
  return (
    <Container>
      <Paper ref={ref} style = {{ marginBottom: theme.spacing(3)}} >
        {props.children}
      </Paper>
  </Container>
  );
});

export default FancyButton;
