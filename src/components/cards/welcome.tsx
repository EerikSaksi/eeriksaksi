import React from 'react'
import CustomCard from 'components/cards/custom_card'
import {Avatar} from '@material-ui/core'
const Welcome: React.FC = () => {
  return (
    <CustomCard>
      <p>wowa</p>
      <Avatar alt = "Eerik Saksi" src = "media/orek.jpg"/>
    </CustomCard>
  )
}
export default Welcome
