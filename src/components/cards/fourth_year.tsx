import React from 'react';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ProgressiveImageProps } from 'react-progressive-image-loading';
import QAndAAccordion from 'components/q_and_a_accordion';
import CourseTable from 'components/course_table';
import CustomCardWithBackground from './custom_card_with_background';

const rows = [
  ['Algorithmics II', 'Networked Systems'],
  ['Functional Programming', 'Advanced Networks and Communications'],
  ['Research Methods & Techs (required for Masters)', 'Information Retrieval'],
  ['Professional Skills & Issues (required for everyone)', 'Web Science'],
];

const questionAnswers = [
  {
    question: 'What courses do I have?',
    answer: (
      <CourseTable headers={['First Semester', 'Second Semester']} rowCols={rows}>
        <Typography variant='body1'>Through both semesters, I also have a dissertation project which is worth 33% of our grade. For the first semester (and up until this point in my degree), we haven't have much freedom of choice, but for the second semester we had a lot of freedom, and I decided to study everything I could to increase my understanding and skill in full stack development.</Typography>
      </CourseTable>
    ),
  },
];
const FourthYear: React.FC = () => {
  return (
    <CustomCardWithBackground progressiveImageProps={{ src: require('media/cloisters.jpg'), preview: require('media/cloisters-tiny.jpg') } as ProgressiveImageProps} backgroundImageStyle={{ backgroundPosition: '50% 50%' }} photoCredit='_skynet on flickr'>
      <React.Fragment>
        <Grid container justify='center'>
          <Grid item xs={12}>
            <Typography style={{ textAlign: 'center' }} variant='h2'>
              4th (current) Year at University of Glasgow
            </Typography>
          </Grid>
        </Grid>
        <QAndAAccordion questionAnswers={questionAnswers} />
      </React.Fragment>
    </CustomCardWithBackground>
  );
};

export default FourthYear;
