import React from 'react';
import Welcome from 'components/cards/welcome';
import SideDrawer from 'components/side_drawer';
const App: React.FC = () => {
  return (
    <>
      <SideDrawer content={<Welcome />} />
    </>
  );
};
export default App;
