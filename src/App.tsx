import React  from 'react';
import AllCards from 'components/cards/all_cards'
import 'App.css';
import {useMetricsTracker} from 'hooks/use_metrics_tracker';
const App: React.FC = () => {
  const jumpToNthElement = async (nth: number) => {
    document.getElementsByClassName('app')[0]!.scrollTop = (nth * window.innerHeight) 
  }
  const {setVisibleSection, timeSpentOnSections} = useMetricsTracker()
  return (
    <div className='app' style={{ height: '100vh', scrollSnapType: 'y mandatory', overflowY: 'scroll', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <AllCards setVisibleSection={setVisibleSection} timeSpentOnSections = {timeSpentOnSections}/>
    </div>
  );
};
export default App;
