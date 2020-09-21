import React from 'react';
import SideDrawer from 'components/side_drawer';
import 'App.css'
const App: React.FC = () => {
  return (
    <div className = "app" style = {{  height: '100vh', scrollSnapType: 'y mandatory', overflowY: 'scroll', scrollPaddingTop: 64 }}>
      <SideDrawer />
    </div>
  );
};
export default App;
