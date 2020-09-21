import React from 'react';
import { Card } from '@material-ui/core';
const Loading: React.FC<{height: number | string}> = ({height}) => {
  //pass height so that there will be a variable size card that is the same size as the loading content so it looks like an empty card before the content is there 
  return (
    <Card style = {{ height }}>
      <div style = {{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
    </div>
    </Card>
  );
};
export default Loading;
