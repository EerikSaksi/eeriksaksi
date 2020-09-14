import React from 'react';
import CustomCard from 'components/cards/custom_card';
import { Container, Avatar, Grid, Typography } from '@material-ui/core';
const Welcome: React.FC = () => {
  return (
    <CustomCard>
      <Grid container justify = "space-around">
        <Grid item sm={6}>
          <Grid container justify='flex-end'>
            <Grid item xs = {12}>
              <Typography style = {{textAlign: 'center'}} variant='h1'>Eerik Saksi</Typography>
            </Grid>
            <Grid item xs = {12}>
              <Typography style = {{textAlign: 'center'}} variant='h2'>Aspiring</Typography>
            </Grid>
            <Grid item xs = {6}>
              <Grid container justify = "center">
                <Avatar style = {{width: 100, height: 100, backgroundColor: 'blue'}}>
                  Frontend
                </Avatar>
              </Grid>
            </Grid>
            <Grid item xs = {6}>
              <Grid container justify = "center">
                <Avatar style = {{width: 100, height: 100, backgroundColor: 'yellow', color: 'black', }}>
                  Backend
                </Avatar>
              </Grid>
            </Grid>
            <Grid item xs = {12}>
              <Typography  style = {{textAlign: 'center'}} variant='h2'>Developer</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={1}>
          <Grid container justify='flex-end'>
            <Avatar style={{ height: 200, width: 200, justifyContent: 'center' }} alt='Eerik Saksi' src={require('media/orek.jpg')} />
          </Grid>
        </Grid>
      </Grid>
    </CustomCard>
  );
};
export default Welcome;
