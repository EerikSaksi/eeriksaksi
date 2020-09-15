import React, { useState, useMemo } from 'react';
import CustomCard from 'components/cards/custom_card';
import { Container, Slider, Typography } from '@material-ui/core';

const dates = [
  {
    description: 'Started studying in University of Glasgow second year entry',
    startDate: new Date('2018-09-21'),
    endDate: new Date('2019-05-19'),
  },
  { description: 'Worked at UROS', startDate: new Date('2018-06-25'), endDate: new Date('2019-08-02') },
];
const TimeLine: React.FC = () => {
  const [dateIndex, setDateIndex] = useState(0);

  //returns the total difference from the first day to the last day
  const getDeltaFromFirst = (date: Date) => {
    const diffTime = Math.abs(dates[0].startDate.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const maxDate = useMemo(() => getDeltaFromFirst(dates[dates.length - 1].endDate)
  const {startDate, endDate, description} = dates[dateIndex]
  return (
    <CustomCard>
      <Typography variant='h1'>Timeline</Typography>
      <Container style={{ width: '90%' }}>
        <Slider value={[getDeltaFromFirst(startDate), getDeltaFromFirst(endDate)]} getAriaLabel={() => startDate.toString()} max = {)} />
      </Container>
    </CustomCard>
  );
};
export default TimeLine;
