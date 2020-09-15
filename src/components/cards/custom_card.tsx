import React, { forwardRef } from 'react';
import { CardProps, useTheme, Card } from '@material-ui/core';

//type CardProps = React.ReactNode
//const CustomCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
//  const theme = useTheme()
//  return (
//    <Card ref = {ref} style = {{ marginBottom: theme.spacing(10)}}>{props.children}</Card>
//  );
//})
const FancyButton = React.forwardRef<unknown, CardProps>((props, ref) => {
  const theme = useTheme()
  return (
    <Card ref={ref} style={{ marginBottom: theme.spacing(3)}}>
      {props.children}
    </Card>
  );
});

export default FancyButton;
