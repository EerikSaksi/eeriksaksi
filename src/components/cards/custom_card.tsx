import React, {forwardRef} from 'react';
import { useMediaQuery, Container,  CardProps, useTheme, Paper } from '@material-ui/core';
const FancyButton = React.forwardRef<unknown, CardProps>((props, ref) => {
  const theme = useTheme();
  const notPhone = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Container style = {{  scrollSnapType: 'y mandatory'}}>
      <Paper ref={ref} style = {  notPhone ? {marginTop : 'calc(50vh - 56px)', transform: 'translateY(-50%)', marginBottom: 'calc(50vh - 56px)'} : {}} >
        {props.children}
      </Paper>
    </Container>
  );
});

export default FancyButton;
