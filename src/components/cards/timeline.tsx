import React, { useState, useEffect } from 'react';
import CustomCard from 'components/cards/custom_card';
import { Fade, useTheme, Container, Slider, Typography } from '@material-ui/core';

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
  return (phrase.length / 8) * 1000;
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

  const [sliderValue, setSliderValue] = useState<number[]>([0, 0]);

  //changes oldValues to newValues in 100 equal steps
  const animateValueChange = async (oldValues: number[], newValues: number[]) => {
    const leftStepAmount = (newValues[0] - oldValues[0]) / 100;
    const rightStepAmount = (newValues[1] - oldValues[1]) / 100;
    for (let index = 0; index < 100; index++) {
      oldValues[0] += leftStepAmount;
      oldValues[1] += rightStepAmount;
      setSliderValue(oldValues);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  };
  const [description, setDescription] = useState('');

  console.log(sliderValue);
  const [textVisible, setTextVisible] = useState(false);
  useEffect(() => {
    const periodicallyIncrementIndex = async () => {
      for (const date of dates) {
        setTextVisible(true);
        setDescription(date.description);
        if (date.startDate) {
          //get the difference with the new and old date and divide by 100
          const startStepAmount = (getDeltaFromFirst(date.startDate) - sliderValue[0]) / 10;
          const endStepAmount = (getDeltaFromFirst(date.endDate) - sliderValue[1]) / 10;
          //over 10 iterations add the step amount until oldValue is newValue
          for (let index = 0; index < 10; index++) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            setSliderValue((oldValue) => {
              oldValue[0] += startStepAmount;
              oldValue[1] += endStepAmount;
              return oldValue;
            });
          }
          setSliderValue((oldValues) => {
            animateValueChange(oldValues, [getDeltaFromFirst(date.startDate), getDeltaFromFirst(date.endDate)]);
            return oldValues;
          });
        }
        await new Promise((resolve) => setTimeout(resolve, readingTime(date.description)));
        setTextVisible(false);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    };
    periodicallyIncrementIndex();
  }, []);
  console.log(sliderValue[1])
  return (
    <CustomCard>
      <Fade in={textVisible}>
        <>
          <Typography style={{ textAlign: 'center' }} variant='h2'>
            {description}
          </Typography>
          <Typography style={{ textAlign: 'center' }} variant='h2'>
            {`${sliderValue[0]} ${sliderValue[1]}`}
          </Typography>
        </>
      </Fade>
      <Container style={{ width: '90%', marginTop: theme.spacing(3), transition: 'all 500ms' }}>
        <Slider value={sliderValue} getAriaValueText={(value) => 'test'} max={maxDate} valueLabelDisplay='on' aria-labelledby='range-slider' />
      </Container>
    </CustomCard>
  );
};
export default TimeLine;
