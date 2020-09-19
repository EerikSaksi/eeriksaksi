import React from 'react';
import CustomCard from 'components/cards/custom_card';
import { Grid, useTheme } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import ProgressiveImage from 'react-progressive-image-loading';
const SecondYear: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <ProgressiveImage
        src={require('media/glasgow.jpg')}
        preview={require('media/glasgow-tiny.jpg')}
        render={(src, style) => {
          return (
            <CustomCard containerStyle={{ padding: theme.spacing(4) }}>
              <div style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, maxHeight: '100%',  backgroundImage: `url(${src})`, backgroundSize: 'cover', zIndex: -1, ...style, }}></div>
                  <Grid>
                <Typography variant='h2'>Second year at University of Glasgow</Typography>
              </Grid>
            </CustomCard>
          );
        }}
      />
    </>
  );
};

export default SecondYear;
