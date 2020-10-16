import React, { useState } from 'react'; 
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'; 
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type QuestionAnswers = Array<{ question: string; answer: React.ReactNode }>;

const QAndAAccordion: React.FC<{ questionAnswers: QuestionAnswers }> = ({questionAnswers}) => {
  const [currentlyOpenIndex, setCurrentlyOpenIndex] = useState(-1);
  return (
    <React.Fragment>
      {questionAnswers.map(({ question, answer }, index) => (
        <Grid key = {index} item xs={12}>
          <Accordion onChange={() => (index === currentlyOpenIndex ? setCurrentlyOpenIndex(-1) : setCurrentlyOpenIndex(index))} expanded={index === currentlyOpenIndex}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
              <Typography variant='h3'>{question}</Typography>
            </AccordionSummary>
            <AccordionDetails>{answer}</AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </React.Fragment>
  );
};
export default QAndAAccordion;
