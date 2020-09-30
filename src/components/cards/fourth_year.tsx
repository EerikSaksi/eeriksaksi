import React from 'react';
import { Grid, Hidden } from '@material-ui/core';
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
    question: 'Year description / how I chose my courses.',
    answer: (
      <Typography style={{ padding: 16 }} variant='h4'>
        Through both semesters, I also have a dissertation project which is worth 33% of our grade. For the first semester (and up until this point in my degree), we haven't have much freedom of choice, but for the second semester we had a lot of freedom, and I decided to study everything I could to increase my understanding and skill in full stack development.
      </Typography>
    ),
  },
  {
    question: 'What courses do I have?',
    answer: <CourseTable headers={['First Semester', 'Second Semester']} rowCols={rows} />,
  },
  {
    question: 'What is my dissertation project?',
    answer: (
      <Typography style={{ padding: 16 }} variant='h4'>
        I am working on a collaborative activity tracker app. The intent of the app is to encourage accountability for training partners through a common goal on the app that can only be achieved through both people consistently training. I might make it similar to clicker game, where DPS is increased through adherance but combined DPS is required to progress. I'm thinking of using React Native to make the app cross platform, as well as PostGraphile (I have been eyeing this library for a while, it auto generates a GraphQL schema from a PostgreSQL database eliminating the N + 1 problem and eliminating the need for a lot of boilerplate code.)
      </Typography>
    ),
  },
];
const FourthYear: React.FC<{ alertCurrentlyVisible: () => void }> = ({ alertCurrentlyVisible }) => {
  return (
    <CustomCardWithBackground progressiveImageProps={{ src: require('media/cloisters.jpg'), preview: require('media/cloisters-tiny.jpg') } as ProgressiveImageProps} backgroundImageStyle={{ backgroundPosition: '50% 50%' }} photoCredit='_skynet on flickr' alertCurrentlyVisible={alertCurrentlyVisible}>
      <React.Fragment>
        <Hidden xsDown>
          <Grid container justify='center'>
            <Grid item xs={12}>
              <Typography style={{ textAlign: 'center' }} variant='h2'>
                4th (current) Year at University of Glasgow
              </Typography>
            </Grid>
          </Grid>
        </Hidden>
        <QAndAAccordion questionAnswers={questionAnswers} />
      </React.Fragment>
    </CustomCardWithBackground>
  );
};

export default FourthYear;
