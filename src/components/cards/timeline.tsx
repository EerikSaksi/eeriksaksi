import React, { useState, useEffect } from 'react';
import CustomCard from 'components/cards/custom_card';
import { useTheme, Container, Slider, Typography } from '@material-ui/core';

const dates = [
  { description: "Here's my brief timeline:" },
  {
    description: 'Started studying in University of Glasgow second year entry',
    startDate: new Date('2018-09-21'),
    endDate: new Date('2019-05-19'),
  },
  { description: 'Worked at UROS', startDate: new Date('2018-06-25'), endDate: new Date('2019-08-02') },
];

//estimates the readingTime required to read text
const readingTime = (phrase: string) => {
  return phrase.length / 8 * 1000
};

//returns the total difference from the first day to the last day
const getDeltaFromFirst = (date: Date) => {
  //subtract difference from the first dates startDate
  const diffTime = Math.abs(dates[1].startDate!.getTime() - date.getTime());

  //convert to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

//the maxDate (last days endDate)
const maxDate = getDeltaFromFirst(dates[dates.length - 1].endDate!);
const TimeLine: React.FC = () => {
  const theme = useTheme();

  //stores the index of the current date object
  const [dateIndex, setDateIndex] = useState(0);

  const [sliderValue, setSliderValue] = useState<number[]>([]);
  const [description, setDescription] = useState("");
  useEffect(() => {
    const periodicallyIncrementIndex = async () => {
      for (const date of dates){
        console.log(date)
        setDescription(date.description)
        if (date.startDate) {
          setSliderValue([getDeltaFromFirst(date.startDate), getDeltaFromFirst(date.endDate)]);
        }
        await new Promise(resolve => setTimeout(resolve, readingTime(date.description)));
      }
    };
    periodicallyIncrementIndex();
  }, []);
  return (
    <CustomCard>
      <Typography style = {{ textAlign: 'center' }} variant='h2'>{description}</Typography>
      <Container style={{ width: '90%', marginTop: theme.spacing(3), transition: 'all 500ms' }}>
        <Slider value={sliderValue} getAriaValueText={(value) => 'test'} max={maxDate} valueLabelDisplay='on' aria-labelledby='range-slider' />
      </Container>
    </CustomCard>
  );
};
export default TimeLine;
