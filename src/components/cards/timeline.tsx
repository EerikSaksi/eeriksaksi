import React from 'react';
import CustomCard from 'components/cards/custom_card';
import {  Typography } from '@material-ui/core';
const TimeLine: React.FC = () => {
  return (
    <CustomCard>
      <Typography variant = 'h1'>
        Timeline
      </Typography>
    </CustomCard>
  );
};
export default TimeLine;
