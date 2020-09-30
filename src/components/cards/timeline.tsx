import React, { useState, useEffect } from 'react';
import { Grid, Fade, useTheme, Slider, Typography } from '@material-ui/core';
import 'components/cards/timeline.css';
import CustomCardWithBackground from './custom_card_with_background';
import { ProgressiveImageProps } from 'react-progressive-image-loading';

const dates = [
  { description: "Here's my brief timeline:", valueLabelDisplay: false },
  {
    description: 'Started studying in University of Glasgow with second year entry',
    startDate: new Date('2018-09'),
    endDate: new Date('2019-05'),
    valueLabelDisplay: true
  },

  { description: 'Worked at UROS', startDate: new Date('2019-06-25'), endDate: new Date('2019-08-02'), typographyVariant: 'h1', valueLabelDisplay: true },
  { description: 'Completed my third year at Glasgow', startDate: new Date('2019-09'), endDate: new Date('2020-05'), valueLabelDisplay: true },
  { description: 'Worked on my front and backend skills with tunety.pe and this site', startDate: new Date('2020-05'), endDate: new Date('2020-09'), valueLabelDisplay: true },
  { description: "What's my future looking like?", valueLabelDisplay: false },
  { description: 'Will complete my fourth year at Glasgow', startDate: new Date('2020-09'), endDate: new Date('2021-05'), valueLabelDisplay: true },
  { description: "Hopefully working in an interesting company (if you're reviewing my internship application you are one 😊)", startDate: new Date('2021-06'), endDate: new Date('2021-09'), valueLabelDisplay: true },
  { description: 'Will complete my final year and graduate with an MSci in Computing', startDate: new Date('2021-09'), endDate: new Date('2022-05'), valueLabelDisplay: true },
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

  var options = { year: 'numeric', month: 'long' };
  return displayDate.toLocaleString('en-US', options);
}

//the maxDate (last days endDate)
const maxDate = getDeltaFromFirst(dates[dates.length - 1].endDate!);
const TimeLine: React.FC<{ alertCurrentlyVisible: () => void }> = ({ alertCurrentlyVisible }) => {
  const theme = useTheme();
  const [inView, setInView] = useState(false);
  const [sliderValue, setSliderValue] = useState<number[]>([0, 0]);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [dateIndex, setDateIndex] = useState(0);
  const [ranFunction, setRanFunction] = useState(false);
  useEffect(() => {
    const periodicallyIncrementIndex = async () => {
      for (var i = dateIndex; i < dates.length && inView; i++) {
        setDateIndex(i);
        const date = dates[i];
        setDescriptionVisible(true);
        await new Promise((resolve) => setTimeout(resolve, readingTime(date.description)));
        if (i !== dates.length - 1) {
          setDescriptionVisible(false);
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    };
    if (inView && !ranFunction) {
      setRanFunction(true);
      periodicallyIncrementIndex();
    }
  }, [inView, ranFunction, dateIndex]);
  useEffect(() => {
    const date = dates[dateIndex];
    if (date.startDate) {
      setSliderValue([getDeltaFromFirst(date.startDate), getDeltaFromFirst(date.endDate)]);
    }
  }, [dateIndex]);
  return (
    <CustomCardWithBackground progressiveImageProps={{ src: require('media/road.jpg'), preview: require('media/road-tiny.jpg') } as ProgressiveImageProps} setInView={setInView} cardStyle={{ height: '60vh', padding: theme.spacing(2) }} backgroundImageStyle={{ backgroundPosition: '40% 40%' }} alertCurrentlyVisible={alertCurrentlyVisible}>
      <Grid id='timeline' style={{ height: '100%' }} container justify='center'>
        <Grid item xs={12}>
          <Fade in={descriptionVisible}>
            <Typography style={{ textAlign: 'center' }} variant='h3'>
              {dates[dateIndex].description}
            </Typography>
          </Fade>
        </Grid>
        <Grid justify='center' container alignItems='flex-end'>
          <Grid item xs={10}>
            <Slider value={sliderValue} valueLabelFormat={dayToDisplayDate} max={maxDate} valueLabelDisplay={dates[dateIndex].valueLabelDisplay ? 'on' : 'off'} aria-labelledby='range-slider' />
          </Grid>
        </Grid>
      </Grid>
    </CustomCardWithBackground>
  );
};
export default TimeLine;
