import React  from 'react';
import AllCards from 'components/cards/all_cards'
import 'App.css';
import {useMetricsTracker} from 'hooks/use_metrics_tracker';
const App: React.FC = () => {
  const {setVisibleSection, timeSpentOnSections} = useMetricsTracker()
  return (
    <div className='app'>
      <AllCards setVisibleSection={setVisibleSection} timeSpentOnSections = {timeSpentOnSections}/>
    </div>
  );
};
export default App;
