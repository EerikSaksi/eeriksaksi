import React from 'react';
import { Grid} from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ProgressiveImageProps } from 'react-progressive-image-loading';
import QAndAAccordion from 'components/q_and_a_accordion';
import CourseTable from 'components/course_table';
import CustomCardWithBackground from './custom_card_with_background';

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
    answer: <CourseTable headers = {['First Semester','Second Semester']} rowCols={rows} />,
  },
  { question: 'What was the most useful course?', answer: <Typography variant='subtitle1'>Although it was difficult and painful for me at the time, Web App Development 2 taught me how to use Git and was my first experience with full stack development through Django, which I have come to love today.</Typography> },
  { question: 'What was my favourite course?', answer: <Typography variant='subtitle1'>I found Algorithms and Data Structures to be interesting, and the runtime complexity is something I always keep in the back of my mind to this day as I program.</Typography> },
];
const SecondYear: React.FC = () => {
  return (
    <CustomCardWithBackground progressiveImageProps={{ src: require('media/glasgow.jpg'), preview: require('media/glasgow-tiny.jpg') } as ProgressiveImageProps} backgroundImageStyle = {{ backgroundPosition: '80% 80%', }} photoCredit = 'Policy Scotland'>
      >
      <React.Fragment>
        <Grid container justify='center'>
          <Grid item xs={12}>
            <Typography style={{ textAlign: 'center' }} variant='h2'>
              2nd Year at University of Glasgow
            </Typography>
          </Grid>
        </Grid>
        <QAndAAccordion questionAnswers={questionAnswers} />
      </React.Fragment>
    </CustomCardWithBackground>
  );
};

export default SecondYear;
