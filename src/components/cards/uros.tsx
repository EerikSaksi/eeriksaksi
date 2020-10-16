import React, { lazy } from 'react';
import { Grid, useTheme, Avatar, Paper, useMediaQuery, Hidden } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ProgressiveImageProps } from 'react-progressive-image-loading';
import CustomCardWithBackground from './custom_card_with_background';
const QAndAAccordion = lazy(() => import('components/q_and_a_accordion'));

const Uros: React.FC<{ alertCurrentlyVisible: () => void }> = ({ alertCurrentlyVisible }) => {
  const theme = useTheme();
  const usingPhone = useMediaQuery(theme.breakpoints.down('sm'));

  const jobDescription = (
    <Grid container justify='center'>
      <Grid item>
        <Hidden xsDown>
          <Typography style={{ textAlign: 'center', marginTop: usingPhone ? 0 :  theme.spacing(4)}} variant='h3'>
            What did I do at UROS?
          </Typography>
        </Hidden>
        <Typography style={{ textAlign: 'center', }} variant='h4'>
          I was given a legacy system running where data from a MYSQL database was being processed by LabVIEW and a neural network written in C. I managed to reverse engineer and replace LabVIEW and the C library with a singular Python program, which allowed UROS to use a newer neural network technology whilst maintaining backwards compatibility.
        </Typography>
      </Grid>
    </Grid>
  );
  const testimonial = (
    <Grid item xs={12}>
      <Hidden xsDown>
        <Typography style={{ textAlign: 'center' }} variant='h3'>
          UROS Internship
        </Typography>
      </Hidden>
      <Grid item xs={12} style={{ marginBottom: theme.spacing(2) }}>
        <Grid container alignItems='center' justify='space-evenly'>
          <Grid item xs={12} sm={2}>
            <Grid container justify='center'>
                <Avatar style={{ justifyContent: 'center', textAlign: 'center', height: 100, width: 100 }} src={require('media/jyrki.jpeg')} />
                <Typography style={{ textAlign: 'center' }} variant='h5'>
                  Jyrki Hyvärinen, my supervisor
                </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={9}>
              <Typography variant='h4'>"Eerik filled very well his position as a trainee in our software development team. Eerik has enthusiastic attitude towards learning new areas, even difficult ones. This mindset helped us to achieve good goals in a short time. Promising young talent."</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  //if using phone wrap the sections in an accordion, otherwise dont
  const content = usingPhone ? (
    <QAndAAccordion
      questionAnswers={[
        { question: "Supervisor's comment", answer: testimonial },
        { question: 'What did I do at UROS?', answer: jobDescription },
      ]}
    />
  ) : (
    <Grid container justify='center'>
      {testimonial}
      {jobDescription}
    </Grid>
  );

  return (
    <CustomCardWithBackground progressiveImageProps={{ src: require('media/uros.webp'), preview: require('media/uros.webp') } as ProgressiveImageProps} backgroundImageStyle={{ backgroundPosition: '100% 100%' }} photoCredit='kolster.fi' alertCurrentlyVisible={alertCurrentlyVisible}>
      {content}
    </CustomCardWithBackground>
  );
};

export default Uros;
