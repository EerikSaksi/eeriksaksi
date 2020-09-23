import React from 'react';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ProgressiveImageProps } from 'react-progressive-image-loading';
import QAndAAccordion from 'components/q_and_a_accordion';
import CourseTable from 'components/course_table';
import CustomCardWithBackground from './custom_card_with_background';

const rows = [
  ['Systems Programming', 'Mobile Human Computer Interaction'],
  ['Algorithms I', 'Database Systems'],
  ['Professional Software Development', 'Cyber Security Fundamentals'],
  ['Data Fundamentals', 'Text as Data'],
];

const questionAnswers = [
  {
    question: 'What courses did I have?',
    answer: (
      <CourseTable headers = {['First Semester','Second Semester']} rowCols={rows}>
        <Typography variant='body1'>Through both semesters, I also had a team project where we worked with a customer that was worth 33% of our grade.</Typography>
      </CourseTable>
    ),
  },
  { question: 'What were my favourite courses?', answer: <Typography variant='subtitle1'>I found Database Systems to be helpful to me for creating better and more extensible database schemas. Cyber Security Fundamentals has made me more vary of my security choices in applications</Typography> },
  { question: 'What was my favourite course?', answer: <Typography variant='subtitle1'> Although I haven't touched low level languages since this class, Systems Programming has made me interested in implementing efficient API's with something like Rust's Actix Web.</Typography> },
];
const SecondYear: React.FC<{alertCurrentlyVisible:() => void}> = ({alertCurrentlyVisible}) => {
  return (
    <CustomCardWithBackground progressiveImageProps={{ src: require('media/glasgow-grass.jpg'), preview: require('media/glasgow-grass-tiny.jpg') } as ProgressiveImageProps} backgroundImageStyle = {{ backgroundPosition: '25%, 25%', }} photoCredit = 'University of Glasgow Facebook' alertCurrentlyVisible = {alertCurrentlyVisible}>
      <React.Fragment>
        <Grid container justify='center'>
          <Grid item xs={12}>
            <Typography style={{ textAlign: 'center' }} variant='h2'>
              3rd Year at University of Glasgow
            </Typography>
          </Grid>
        </Grid>
        <Grid>
          <QAndAAccordion questionAnswers={questionAnswers} />
        </Grid>
      </React.Fragment>
    </CustomCardWithBackground>
  );
};

export default SecondYear;
