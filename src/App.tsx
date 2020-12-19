import React, {useCallback}  from 'react';
import AllCards from 'components/cards/all_cards'
import 'App.css';
import {useMetricsTracker} from 'hooks/use_metrics_tracker';
const App: React.FC = () => {
  const {setVisibleSection, timeSpentOnSections} = useMetricsTracker()
  const setVisibleSectionCallback = useCallback((val: string) => {
    setVisibleSection(val)
  }, [setVisibleSection])
  return (
    <div className='app'>
      <AllCards setVisibleSection={setVisibleSectionCallback} timeSpentOnSections = {timeSpentOnSections}/>
    </div>
  );
};
export default App;
