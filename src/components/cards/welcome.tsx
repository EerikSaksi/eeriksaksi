import React from 'react'
import CustomCard from 'components/cards/custom_card'
import {Avatar} from '@material-ui/core'
const Welcome: React.FC = () => {
  return (
    <CustomCard>
      <Avatar style = {{ height: 200,  width: 200, justifyContent: 'center'}} alt = "Eerik Saksi" src = {require('media/orek.jpg')}/>
    </CustomCard>
  )
}
export default Welcome
