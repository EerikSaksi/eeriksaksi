import React from 'react';
import CustomCard from 'components/cards/custom_card';
import { Grid, useTheme } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import ProgressiveImage from "react-progressive-image-loading";
const SecondYear: React.FC = () => {
  const theme = useTheme();
  return (
    <ProgressiveImage src = {require('media/glasgow.jpg')} placeholder={require('media/glasgow-tiny.jpg')}>
      {(src) => (
        <CustomCard containerStyle={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', padding: theme.spacing(4) }}>
          <Grid>
            <Typography variant='h2'>Second year at University of Glasgow</Typography>
          </Grid>
        </CustomCard>
      )}
    </ProgressiveImage>
  );
};
export default SecondYear;
