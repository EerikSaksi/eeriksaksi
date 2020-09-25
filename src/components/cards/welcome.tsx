import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import CustomCardWithBackground from './custom_card_with_background';
import { ProgressiveImageProps } from 'react-progressive-image-loading';
const Welcome: React.FC<{alertCurrentlyVisible:() => void}> = ({alertCurrentlyVisible}) => {
  const [inView, setInView] = useState(false)

  //whether or not the balls should start moving, set from the useEffect hook
  const [ballsShifted, setBallsShifted] = useState(false);

  const [showFullstack, setShowFullstack] = useState(false);

  //used to calculate the left offset amount
  const ballRowRef = useRef<HTMLDivElement>(null);

  //the width of a row, used to calculate the offset amount
  const [ballRowWidth, setBallRowWidth] = useState(0);
  useEffect(() => {
    const sleepAndShiftBalls = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBallsShifted(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowFullstack(true);
    };
    //if inview trigger animations
    if (inView) {
      sleepAndShiftBalls();
    }
  }, [inView]);
  useEffect(() => {
    if (ballRowRef.current) {
      setBallRowWidth(ballRowRef.current.clientWidth - 50);
    }
  }, [ballRowWidth]);
  return (
    <CustomCardWithBackground progressiveImageProps={{ src: require('media/coffee.jpg'), preview: require('media/coffee-tiny.jpg') } as ProgressiveImageProps} backgroundImageStyle={{ backgroundPosition: '0% 20%' }}  setInView = {setInView} alertCurrentlyVisible = {alertCurrentlyVisible}>
      <Grid container justify='space-evenly'>
        <Grid item sm={6}>
          <Grid container justify='flex-end'>
            <Grid item xs={12}>
              <Typography style={{ textAlign: 'center' }} variant='h1'>
                Eerik Saksi
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ textAlign: 'center' }} variant='h2'>
                Aspiring
              </Typography>
            </Grid>
            {showFullstack ? (
              <Grid item xs={12}>
                <Grid container justify='center'>
                  <Avatar style={{ transition: 'all ease-in-out 1.5s', width: 100, height: 100, backgroundColor: 'green' }}>Fullstack</Avatar>
                </Grid>
              </Grid>
            ) : (
              <>
                <Grid ref={ballRowRef} item xs={6}>
                  <Grid container justify='flex-start'>
                    <Avatar style={{ backgroundBlendMode: 'multiply', opacity: 0.7, transition: 'all ease-in-out 1.5s', left: ballsShifted ? ballRowWidth : 0, width: 100, height: 100, backgroundColor: 'blue' }}>Frontend</Avatar>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container justify='flex-end'>
                    <Avatar style={{ backgroundBlendMode: 'multiply', opacity: 0.7, transition: 'all ease-in-out 1.5s', right: ballsShifted ? ballRowWidth : 0, width: 100, height: 100, backgroundColor: 'yellow', color: 'black' }}>Backend</Avatar>
                  </Grid>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Typography style={{ textAlign: 'center' }} variant='h2'>
                Developer
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={1}>
          <Grid container justify='flex-end'>
            <Avatar style={{ height: 200, width: 200, justifyContent: 'center' }} alt='Eerik Saksi' src={require('media/orek.jpg')} />
          </Grid>
        </Grid>
      </Grid>
    </CustomCardWithBackground>
  );
};
export default Welcome;
