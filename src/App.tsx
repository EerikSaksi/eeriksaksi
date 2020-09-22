import React, { useEffect, useCallback } from 'react';
import SideDrawer from 'components/side_drawer';
import 'App.css';
const App: React.FC = () => {
  const jumpToNthElement = async (nth: number) => {
    document.getElementsByClassName('app')[0]!.scrollTop = (nth * window.innerHeight) 
  }
  return (
    <div className='app' style={{ height: '100vh', scrollSnapType: 'y mandatory', overflowY: 'scroll', scrollPaddingTop: 64 }}>
      <SideDrawer jumpToNthElement = {jumpToNthElement} />
    </div>
  );
};
export default App;
