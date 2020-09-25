import React from 'react';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ProgressiveImageProps } from 'react-progressive-image-loading';
import QAndAAccordion from 'components/q_and_a_accordion';
import CustomCardWithBackground from './custom_card_with_background';

const questionAnswers = [
  { question: 'Assigned task', answer: <Typography variant='body1'>We were assigned with 4 other random students, and a customer to work with. We were assigned to work with Leidos. Leidos wanted an app that could help them manage their parking. </Typography> },
  { question: 'What was our workflow like?', answer: <Typography variant='body1'>We tried to implement Agile Practices. We had an active backlog, regular stand ups, and regular meetings with the customer to change our goals and specification based on customer feedback. We used branching in Git and reviewed each others merge requests. We created and assigned issues, giving them rating from a scale of 1 to 5, and tried to assign fairly based on area of expertise and other assigned issues.</Typography> },
  { question: 'What was our technology stack?', answer: <Typography variant='body1'>We used React Native in order to avoid creating two native apps, and as an API we used Python with FastAPI and SQLAlchemy for persistent storage.</Typography> },
  { question: 'What responsibilities did I assume?', answer: <Typography variant='body1'>We had no given roles, but I had the most prior experience with backend and frontend experience, and became the de facto lead software developer, (I chose React Native and FastAPI and helped my teammates understand it, and wrote the majority of the React Native app).</Typography> },
];
const SecondYear: React.FC<{ alertCurrentlyVisible: () => void }> = ({ alertCurrentlyVisible }) => {
  return (
    <CustomCardWithBackground progressiveImageProps={{ src: require('media/leidos.jpeg'), preview: require('media/leidos-tiny.jpeg') } as ProgressiveImageProps} backgroundImageStyle={{ backgroundPosition: '100% 0%' }} photoCredit='Leidos Twitter'  alertCurrentlyVisible = {alertCurrentlyVisible}>
      <React.Fragment>
        <Grid container justify='center'>
          <Grid item xs={12}>
            <Typography style={{ textAlign: 'center' }} variant='h2'>
              3rd Year Team Project
            </Typography>
          </Grid>
        </Grid>
        <QAndAAccordion questionAnswers={questionAnswers} />
      </React.Fragment>
    </CustomCardWithBackground>
  );
};

export default SecondYear;
