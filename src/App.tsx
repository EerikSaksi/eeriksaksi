import React from 'react';
import SideDrawer from 'components/side_drawer'
const App: React.FC = () => {
  return (
    <div style = {{overflow: 'scroll', height: '100vh',  scrollSnapType: 'y mandatory', }} >
      <SideDrawer/>
    </div>
  );
};
export default App;
