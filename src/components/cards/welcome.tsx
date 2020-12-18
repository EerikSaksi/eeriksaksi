import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Grid, Hidden, Typography } from '@material-ui/core';
import CustomCardWithBackground from './custom_card_with_background';
import { ProgressiveImageProps } from 'react-progressive-image-loading';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import GitHubIcon from '@material-ui/icons/GitHub';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
const Welcome: React.FC<{ alertCurrentlyVisible: () => void }> = ({ alertCurrentlyVisible }) => {
  const [inView, setInView] = useState(false);

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
    <CustomCardWithBackground progressiveImageProps={{ src: require('media/coffee.jpg'), preview: require('media/coffee-tiny.jpg') } as ProgressiveImageProps} backgroundImageStyle={{ backgroundPosition: '0% 20%', }} setInView={setInView} alertCurrentlyVisible={alertCurrentlyVisible}>
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
        <Grid item sm={3}>
          <Grid style={{ marginBottom: '0.5em' }} container justify='center'>
            <Avatar style={{ height: 200, width: 200, justifyContent: 'center' }} alt='Eerik Saksi' src={require('media/orek.jpg')} />
          </Grid>
          <Grid style={{ marginBottom: '0.5em' }} container alignItems='flex-end' justify='center'>
            <Grid item sm={1} xs={2} style = {{ display: 'flex', alignSelf: 'center' }}>
              <PhoneIcon />
            </Grid>
            <Grid item alignItems = "flex-start">
              <Typography style={{ textAlign: 'center' }} variant='h5'>
                <a href='tel:+44 7519 698 702'>
                  <Hidden xsDown>
                    +44 7519 698 702
                  </Hidden>
                  <Hidden smUp>
                    Mobile
                  </Hidden>
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Grid style={{ marginBottom: '0.5em' }} container alignItems='flex-end' justify='center'>
            <Grid style = {{ display: 'flex', alignSelf: 'center' }} item sm={1} xs={2} >
              <MailIcon />
            </Grid>
            <Grid item>
              <Typography style={{ textAlign: 'center' }} variant='h5'>
                <a href='mailto:saksi.eerik@gmail.com'>
                  <Hidden xsDown>
                    saksi.eerik@gmail.com
                  </Hidden>
                  <Hidden smUp>
                    Email
                  </Hidden>
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Grid style={{ marginBottom: '0.5em' }} container alignItems='flex-end' justify='center'>
            <Grid item sm={1} xs={2} style = {{ display: 'flex', alignSelf: 'center' }}>
              <GitHubIcon />
            </Grid>
            <Grid item>
              <Typography style={{ textAlign: 'center' }} variant='h5'>
                <a href='https://github.com/EerikSaksi' target='_blank' rel='noopener noreferrer'>
                  EerikSaksi
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Grid style={{ marginBottom: '0.5em' }} container alignItems='flex-end' justify='center'>
            <Grid item sm={1} xs={2} style={{ display: 'flex', alignSelf: 'center' }}>
              <PictureAsPdfIcon />
            </Grid>
            <Grid item>
              <Typography style={{ textAlign: 'center' }} variant='h5'>
                <a href='https://drive.google.com/uc?export=download&id=1ZkthduWcQRQuJ70Ma_PTB11x7ePEzwM7' download >
                  Résumé
                </a>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CustomCardWithBackground>
  );
};
export default Welcome;
