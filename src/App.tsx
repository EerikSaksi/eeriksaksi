import React from 'react';
import CustomDrawer from 'components/side_drawer';
import Welcome from 'components/cards/welcome'
import {Grid} from '@material-ui/core'
import SideDrawer from 'components/side_drawer'
const App: React.FC = () => {
  return (
    <>
      <SideDrawer />
      <Grid>
        <Grid>
          <Welcome/>
        </Grid>
      </Grid>
    </>
  );
};
export default App;
