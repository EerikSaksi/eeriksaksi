import React from 'react'
import {Card} from '@material-ui/core'
const CustomCard: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <Card style = {{width: '80%' }}>
      {children}
    </Card>
  )
}
export default CustomCard;
