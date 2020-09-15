import React from 'react';
import { CircularProgress, Card } from '@material-ui/core';
const Loading: React.FC<{height: number}> = ({height}) => {
  //pass height so that there will be a variable size card that is the same size as the loading content so it looks like an empty card before the content is there 
  return (
    <Card style = {{ height }}>
      <div style = {{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
      <CircularProgress  style = {{ width: 100, height: 100 }}/>
    </div>
    </Card>
  );
};
export default Loading;
