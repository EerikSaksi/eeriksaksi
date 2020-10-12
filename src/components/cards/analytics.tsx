import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { Typography, Slider, Tabs, Grid, Tab, useTheme, makeStyles, useMediaQuery } from '@material-ui/core';
import { ProgressiveImageProps } from 'react-progressive-image-loading';
import CustomCardWithBackground from './custom_card_with_background';
import { TimeSpentOnSections } from 'types';

const sections = ['Welcome', 'Timeline', 'Second Year', 'UROS', 'Third Year', 'Third Year Team Project', 'tunety.pe', 'Fourth Year', 'Analytics'];


const useStyles = makeStyles(theme => ({
  spacedRow: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(8)
    },
  },
}))


const Analytics: React.FC<{ alertCurrentlyVisible: () => void; timeSpentOnSections: TimeSpentOnSections }> = ({ alertCurrentlyVisible, timeSpentOnSections }) => {
  const theme = useTheme();
  const usingPhone = useMediaQuery(theme.breakpoints.down('sm'));

  const [averageTimeSpent, setAverageTimeSpent] = useState<TimeSpentOnSections | null>(null);
  const [maxValue, setMaxValue] = useState(0.1);
  const [currentTab, setCurrentTab] = useState(0);
  const classes = useStyles()
  useEffect(() => {
    fetch('https://rocky-beyond-02836.herokuapp.com/averages', {
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
      Object.keys(timeSpentOnSections).forEach((key) => {
        if (timeSpentOnSections[key] > tempMaxValue) {
          tempMaxValue = timeSpentOnSections[key];
        }
      });
      setMaxValue(tempMaxValue);
    }
  }, [averageTimeSpent]);
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
    <CustomCardWithBackground progressiveImageProps={{ src: require('media/glasgow-grass.jpg'), preview: require('media/glasgow-grass-tiny.jpg') } as ProgressiveImageProps} backgroundImageStyle={{ backgroundPosition: '25%, 25%',  }} photoCredit='University of Glasgow Facebook' alertCurrentlyVisible={alertCurrentlyVisible} cardStyle={{ minHeight: '40vh',  marginRight: 0, }}>
      <Grid  container justify='center' >
        <Tabs  value={currentTab} onChange={(_event, value) => setCurrentTab(value)} indicatorColor='primary' textColor='primary' variant='scrollable' scrollButtons = {usingPhone ? 'on' : 'off'} aria-label='scrollable auto tabs example' >
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
          <Typography style={{ textAlign: 'center' }} variant='h5'>
            I could talk about how I learned Material UI and TypeScript for this site (which I can't believe I lived without) or I could show you how I've tracked your reading times and use it to estimate which sections are and aren't interesting. Here's your and the sites average analytics:
          </Typography>
        </Grid>
        <Grid item xs={10} style = {{ marginBottom: theme.spacing(4) }}>
          <Typography className = {classes.spacedRow} style={{ textAlign: 'center', }} variant='h6'>
            Your spent time
          </Typography>
        </Grid>
        <Grid  style = {{ marginBottom: theme.spacing(4) }} item xs={10}>
          <Slider
            style = {{ transition: 'all 1000ms' }}
            max={maxValue}
            value={timeSpentOnSections[currentSection]}
            valueLabelFormat={(value) => `${value.toFixed(2)}s`}
            valueLabelDisplay='on'
            marks={[
              { value: 0, label: '0s' },
              { value: maxValue, label: `${maxValue}s` },
            ]}
          />
        </Grid>
        <Grid style = {{ marginBottom: theme.spacing(4) }} className = {classes.spacedRow} item xs={10} >
          <Typography style={{ textAlign: 'center' }} variant='h6'>
            Average spent time
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Slider
            max={maxValue}
            value={averageTimeSpent ? averageTimeSpent[currentSection] : 0}
            valueLabelFormat={(value) => `${value.toFixed(2)}s`}
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
