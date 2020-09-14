import React from 'react';
import { Card } from '@material-ui/core';
const CustomCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Card>{children}</Card>
  );
};
export default CustomCard;
