import React, {lazy,Suspense} from 'react'
import CustomCard from 'components/cards/custom_card';
import {Grid} from '@material-ui/core'
import GlasgowBackground from 'media/glasgow.jpg'

const SecondYear: React.FC = () => {
  //const image = <Suspense fallback = {null}>{GlasgowBackground}</Suspense>
  return (
    <CustomCard containerStyle = {{ backgroundImage: `url(${GlasgowBackground})` , backgroundSize: 'cover' }}>
      <Grid>
      </Grid>
    </CustomCard>
  )
}
export default SecondYear
