import React from 'react';
import CustomDrawer from 'components/side_drawer';
import {Container} from '@material-ui/core'
import Welcome from 'components/cards/welcome'

const App: React.FC = () => {
  return (
    <>
      <Container style={{ width: '90vw', height: '100vh', marginLeft: '10vw'}}>
        <Welcome/>
      </Container>
      <CustomDrawer />
    </>
  );
};
export default App;
