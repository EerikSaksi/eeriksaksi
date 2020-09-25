import React, { useState, useEffect} from 'react';
import { Typography, Slider, Tabs, Grid, Tab, useTheme } from '@material-ui/core';
import { ProgressiveImageProps } from 'react-progressive-image-loading';
import CustomCardWithBackground from './custom_card_with_background';
import { TimeSpentOnSections } from 'types';

const sections = ['Welcome', 'Timeline', 'Second Year', 'UROS', 'Third Year', 'Third Year Team Project', 'tunety.pe', 'Fourth Year', 'Analytics'];

const Analytics: React.FC<{ alertCurrentlyVisible: () => void; timeSpentOnSections: TimeSpentOnSections }> = ({ alertCurrentlyVisible, timeSpentOnSections }) => {
  const [averageTimeSpent, setAverageTimeSpent] = useState<TimeSpentOnSections | null>(null);
  const [maxValue, setMaxValue] = useState(0.1);
  const [currentTab, setCurrentTab] = useState(0);
  const theme = useTheme();
  useEffect(() => {
    fetch('http://localhost:4000/averages', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setAverageTimeSpent(json);
      });
  }, []);
  useEffect(() => {
    //find the max value (at the start)
    if (averageTimeSpent) {
      var tempMaxValue = 0;
      Object.keys(averageTimeSpent!).forEach((key) => {
        if (averageTimeSpent![key] > tempMaxValue) {
          tempMaxValue = averageTimeSpent![key];
        }
      });
      Object.keys(timeSpentOnSections).forEach((key) => {
        if (timeSpentOnSections[key] > tempMaxValue) {
          tempMaxValue = timeSpentOnSections[key];
        }
      });
      setMaxValue(tempMaxValue);
    }
  }, [averageTimeSpent, timeSpentOnSections,]);
  const currentSection = sections[currentTab];

  //whenever a section changes, update the max value (this is to prevent constant ugly maxValue updates but allows for changes in the range (for example in the analytics))
  useEffect(() => {
    if (averageTimeSpent) {
      setMaxValue((maxValue) => {
        return Math.max(timeSpentOnSections[currentSection], Math.max(averageTimeSpent[currentSection], maxValue));
      });
    }
  }, [currentTab, timeSpentOnSections, averageTimeSpent, currentSection]);
  return (
    <CustomCardWithBackground progressiveImageProps={{ src: require('media/glasgow-grass.jpg'), preview: require('media/glasgow-grass-tiny.jpg') } as ProgressiveImageProps} backgroundImageStyle={{ backgroundPosition: '25%, 25%' }} photoCredit='University of Glasgow Facebook' alertCurrentlyVisible={alertCurrentlyVisible} cardStyle={{ minHeight: '40vh', width: '100%' }}>
      <Grid container justify='center'>
        <Tabs value={currentTab} onChange={(_event, value) => setCurrentTab(value)} indicatorColor='primary' textColor='primary' variant='scrollable' scrollButtons='auto' aria-label='scrollable auto tabs example'>
          <Tab label='Welcome' />
          <Tab label='Timeline' />
          <Tab label='Second Year' />
          <Tab label='UROS' />
          <Tab label='Third Year' />
          <Tab label='Third Year Team Project' />
          <Tab label='tunety.pe' />
          <Tab label='Fourth Year' />
          <Tab label='Analytics' />
        </Tabs>
        <Grid item xs={12} style={{ marginBottom: theme.spacing(4) }}>
          <Typography style={{ textAlign: 'center' }} variant='body1'>
            I could talk about how I learned Material UI and TypeScript for this site (which I can't believe I lived without,) or I could show you how I've tracked your reading times and use it to estimate which sections are and aren't interesting. Here's your and the sites average analytics:
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography style={{ textAlign: 'center', marginBottom: theme.spacing(8) }} variant='h6'>
            Your spent time
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Slider
            max={maxValue}
            value={timeSpentOnSections[currentSection]}
            valueLabelFormat={(value) => `${value}s`}
            valueLabelDisplay='on'
            marks={[
              { value: 0, label: '0s' },
              { value: maxValue, label: `${maxValue}s` },
            ]}
          />
        </Grid>
        <Grid item xs={10} style={{ marginBottom: theme.spacing(8) }}>
          <Typography style={{ textAlign: 'center' }} variant='h6'>
            Average spent time
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Slider
            max={maxValue}
            value={averageTimeSpent ? averageTimeSpent[currentSection] : 0}
            valueLabelFormat={(value) => `${value}s`}
            valueLabelDisplay='on'
            marks={[
              { value: 0, label: '0s' },
              { value: maxValue, label: `${maxValue}s` },
            ]}
          />
        </Grid>
      </Grid>
    </CustomCardWithBackground>
  );
};

export default Analytics;