import React, { useState } from 'react';
import CustomCard from 'components/cards/custom_card';
import { withStyles, Grid, useTheme, Table, TableHead, TableCell, TableRow, TableBody, Paper, TableContainer } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ProgressiveImage from 'react-progressive-image-loading';
import { useInView } from 'react-hook-inview';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    boxShadow: '0px 1px',
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const rows = [
    ['Java Programming 2', 'Object Oriented Software Engineering 2'],
    ['Algorithmic Foundations 2', 'Algorithms and Data Structures 2'],
    ['Network Operating System Essentials 2', 'Web App Development 2'],
    ['CS1F', 'CS1S',],
    ['Math 1R','Math 1S'],
];

const questionAnswers = [
  {
    question: 'What courses did I have?',
    answer: (
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>First Semester</TableCell>
              <TableCell align='left'>Second Semester</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align='left'>{row[0]}</TableCell>
                  <TableCell align='left'>{row[1]}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    ),
  },
  { question: 'What was the most useful course?', answer: <Typography variant='subtitle1'>Although it was difficult and painful for me at the time, Web App Development 2 taught me how to use Git and was my first experience with full stack development through Django, which I have come to love today.</Typography> },
  { question: 'What was my favourite course?', answer: <Typography variant='subtitle1'>I found Algorithms and Data Structures to be interesting, and the runtime complexity is something I always keep in the back of my mind to this day as I program.</Typography> },
];
const SecondYear: React.FC = () => {
  const theme = useTheme();
  const [inViewRef, inView] = useInView();
  const [currentlyOpenIndex, setCurrentlyOpenIndex] = useState(-1);
  return (
    <>
      <ProgressiveImage
        src={require('media/glasgow.jpg')}
        preview={require('media/glasgow-tiny.jpg')}
        render={(src, style) => {
          return (
            <CustomCard ref={inViewRef} containerStyle={{ padding: theme.spacing(4) }}>
              <div style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, maxHeight: '100%', backgroundImage: `url(${src})`, backgroundSize: 'cover', zIndex: -1, opacity: inView ? 1 : 0, ...style, transition: 'all 500ms', backgroundPosition: '80% 80%' }}></div>
              <Grid container justify='center'>
                <Grid item xs={12}>
                  <Typography style={{ textAlign: 'center' }} variant='h2'>
                    2nd Year at University of Glasgow
                  </Typography>
                </Grid>
                {questionAnswers.map(({ question, answer }, index) => (
                  <Grid item xs={12}>
                    <Accordion onChange={() => (index === currentlyOpenIndex ? setCurrentlyOpenIndex(-1) : setCurrentlyOpenIndex(index))} expanded={index === currentlyOpenIndex}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                        <Typography variant='h4'>{question}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>{answer}</AccordionDetails>
                    </Accordion>
                  </Grid>
                ))}
              </Grid>
            </CustomCard>
          );
        }}
      />
    </>
  );
};

export default SecondYear;
