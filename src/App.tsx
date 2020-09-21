import React from 'react';
import SideDrawer from 'components/side_drawer';
const App: React.FC = () => {
  return (
    <div style = {{  height: '100vh', scrollSnapType: 'y mandatory', WebkitOverflowScrolling: 'touch', overflowY: 'scroll', scrollPaddingTop: 64 }}>
      <SideDrawer />
    </div>
  );
};
export default App;
