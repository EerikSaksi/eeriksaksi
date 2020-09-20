import React, { useState } from 'react';
import CustomCard from 'components/cards/custom_card';
import { Grid, useTheme } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import ProgressiveImage from 'react-progressive-image-loading';
import { useInView } from 'react-hook-inview';
import QAndAAccordion from 'components/q_and_a_accordion';
import CourseTable from 'components/course_table';

const rows = [
  ['Java Programming 2', 'Object Oriented Software Engineering 2'],
  ['Algorithmic Foundations 2', 'Algorithms and Data Structures 2'],
  ['Network Operating System Essentials 2', 'Web App Development 2'],
  ['CS1F', 'CS1S'],
  ['Math 1R', 'Math 1S'],
];

const questionAnswers = [
  {
    question: 'What courses did I have?',
    answer: <CourseTable twoColRows={rows} />,
  },
  { question: 'What was the most useful course?', answer: <Typography variant='subtitle1'>Although it was difficult and painful for me at the time, Web App Development 2 taught me how to use Git and was my first experience with full stack development through Django, which I have come to love today.</Typography> },
  { question: 'What was my favourite course?', answer: <Typography variant='subtitle1'>I found Algorithms and Data Structures to be interesting, and the runtime complexity is something I always keep in the back of my mind to this day as I program.</Typography> },
];
const SecondYear: React.FC = () => {
  const theme = useTheme();
  const [inViewRef, inView] = useInView();
  return (
    <>
      <ProgressiveImage
        src={require('media/glasgow.jpg')}
        preview={require('media/glasgow-tiny.jpg')}
        render={(src, style) => {
          return (
            <CustomCard ref={inViewRef} containerStyle={{ paddingLeft: theme.spacing(4), paddingRight: theme.spacing(4) }}>
              <div style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, maxHeight: '100%', backgroundImage: `url(${src})`, backgroundSize: 'cover', zIndex: -1, opacity: inView ? 1 : 0, ...style, transition: 'all 500ms', backgroundPosition: '80% 80%' }}></div>
              <Grid container justify='center'>
                <Grid item xs={12}>
                  <Typography style={{ textAlign: 'center' }} variant='h2'>
                    2nd Year at University of Glasgow
                  </Typography>
                </Grid>
              </Grid>
              <QAndAAccordion questionAnswers={questionAnswers} />
            </CustomCard>
          );
        }}
      />
    </>
  );
};

export default SecondYear;
