import React, { forwardRef } from 'react';
import { Container,  CardProps, useTheme, Card } from '@material-ui/core';
const FancyButton = React.forwardRef<unknown, CardProps>((props, ref) => {
  const theme = useTheme();
  return (
    <Container>
      <Card ref={ref} style = {{ marginBottom: theme.spacing(3)}} >
        {props.children}
      </Card>
  </Container>
  );
});

export default FancyButton;
