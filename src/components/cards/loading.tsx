import React from 'react';
import { CircularProgress, Card } from '@material-ui/core';
const Loading: React.FC = () => {
  return (
    <Card>
      <CircularProgress />
    </Card>
  );
};
export default Loading;
