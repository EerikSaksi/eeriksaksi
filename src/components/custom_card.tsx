import React from 'react'
import {Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(
  {
    root: {backgroundColor: 'blue'}
  }
)
const CustomCard: React.FC<{children: React.ReactNode}> = ({children}) => {
  const classes = useStyles()
  return(
    <Card className = {classes.root} style = {{width: '80%',  }}>
      {children}
    </Card>
  )
}
export default CustomCard;
