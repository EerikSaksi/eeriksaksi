import React, { useState, useEffect } from 'react';
import CustomCard from 'components/cards/custom_card';
import { useTheme, Container, Slider, Typography } from '@material-ui/core';
import 'components/cards/timeline.css';

const dates = [
  { description: "Here's my brief timeline:" },
  {
    description: 'Started studying in University of Glasgow second year entry',
    startDate: new Date('2018-09'),
    endDate: new Date('2019-05'),
  },
  { description: 'Worked at UROS', startDate: new Date('2019-06-25'), endDate: new Date('2019-08-02') },
  { description: 'Completed my third year at Glasgow', startDate: new Date('2019-09'), endDate: new Date('2020-05') },
  { description: 'Worked on my front and backend skills with tunety.pe and this site', startDate: new Date('2020-05'), endDate: new Date('2020-09') },
  { description: "What's my future looking like?",},
  { description: 'Will complete my fourth year at Glasgow', startDate: new Date('2020-09'), endDate: new Date('2021-05') },
  { description: "Hopefully working in an interesting company ( if you're reviewing my internship application you are one :) )", startDate: new Date('2020-09'), endDate: new Date('2021-05') },
];

//estimates the readingTime required to read text
const readingTime = (phrase: string) => {
  return (phrase.length / 6) * 1000;
};

//returns the total difference from the first day to the last day
const getDeltaFromFirst = (date: Date) => {
  //subtract difference from the first dates startDate
  const diffTime = date.getTime() - dates[1].startDate!.getTime();

  //convert to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

//reverse of getDeltaFromFirst, as the slider needs a function to convert the day number to a display date
function dayToDisplayDate(day: number) {
  const diffMillis = Math.floor(day * (1000 * 60 * 60 * 24));
  const displayDate = new Date(dates[1].startDate!.getTime() + diffMillis);

  var options = {  year: 'numeric', month: 'long', };
  return displayDate.toLocaleString("en-US", options)
};

//the maxDate (last days endDate)
const maxDate = getDeltaFromFirst(dates[dates.length - 1].endDate!);
const TimeLine: React.FC = () => {
  const theme = useTheme();

  const [sliderValue, setSliderValue] = useState<number[]>([0, 0]);
  const [description, setDescription] = useState('');
  useEffect(() => {
    const periodicallyIncrementIndex = async () => {
      for (const date of dates) {
        setDescription(date.description);
        if (date.startDate) {
          setSliderValue([getDeltaFromFirst(date.startDate), getDeltaFromFirst(date.endDate)]);
        }
        await new Promise((resolve) => setTimeout(resolve, readingTime(date.description)));
      }
    };
    periodicallyIncrementIndex();
  }, []);
  return (
    <CustomCard>
      <Typography style={{ textAlign: 'center' }} variant='h2'>
        {description}
      </Typography>
      <Container style={{ width: '90%', marginTop: theme.spacing(10), transition: 'all 500ms' }}>
        <Slider value={sliderValue} valueLabelFormat={dayToDisplayDate} max={maxDate} valueLabelDisplay={sliderValue[1] ? 'on' : 'off'} aria-labelledby='range-slider' />
      </Container>
    </CustomCard>
  );
};
export default TimeLine;
