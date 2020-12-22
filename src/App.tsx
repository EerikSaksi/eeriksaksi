import React, {useCallback, useRef, useEffect}  from 'react';
import AllCards from 'components/cards/all_cards'
import 'App.css';
import {useMetricsTracker} from 'hooks/use_metrics_tracker';
const App: React.FC = () => {
  const {setVisibleSection, timeSpentOnSections} = useMetricsTracker()
  const setVisibleSectionCallback = useCallback((val: string) => {
    setVisibleSection(val)
  }, [setVisibleSection])
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (ref.current){
      const log = () => console.log('scrolled')
      ref.current!.addEventListener('scroll', log)
    }
  }, [ref])
  return (
    <div ref = {ref} className='app'>
      <AllCards setVisibleSection={setVisibleSectionCallback} timeSpentOnSections = {timeSpentOnSections}/>
    </div>
  );
};
export default App;
