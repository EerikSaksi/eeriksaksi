import React, {useCallback, useRef, useEffect, useState}  from 'react';
import AllCards from 'components/cards/all_cards'
import 'App.css';
import {useMetricsTracker} from 'hooks/use_metrics_tracker';
const App: React.FC = () => {
  const {setVisibleSection, timeSpentOnSections} = useMetricsTracker()
  const setVisibleSectionCallback = useCallback((val: string) => {
    setVisibleSection(val)
  }, [setVisibleSection])
  const [cardPosition, setCardPosition] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (ref.current){
      const log = () => setCardPosition(ref.current!.scrollTop / ref.current!.clientHeight)
      ref.current!.addEventListener('scroll', log)
    }
  }, [ref])

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (ref.current){
        ref.current.scrollTop = ref.current!.clientHeight * cardPosition
      }
    }) 
  }, [cardPosition])

  console.log(cardPosition)
  return (
    <div  ref = {ref} className='app'>
      <AllCards setVisibleSection={setVisibleSectionCallback} timeSpentOnSections = {timeSpentOnSections} cardPosition = {cardPosition}/>
    </div>
  );
};
export default App;
