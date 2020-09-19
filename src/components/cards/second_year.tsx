import React, {lazy,Suspense} from 'react'
import CustomCard from 'components/cards/custom_card';
import {Grid, useTheme} from '@material-ui/core'
import GlasgowBackground from 'media/glasgow.jpg'
import {Typography} from '@material-ui/core'

const SecondYear: React.FC = () => {
  const theme = useTheme()
  return (

  <React.Fragment>
    <CustomCard containerStyle = {{ backgroundImage: `url(${GlasgowBackground})` , backgroundSize: 'cover', padding: theme.spacing(4)}}>
      <Grid>
        <Typography variant = "h2">
          Second year at University of Glasgow
        </Typography>
      </Grid>
    </CustomCard>
  </React.Fragment>
  )
}
export default SecondYear
