import React, {useCallback, useRef, useEffect, useState}  from 'react';
import AllCards from 'components/cards/all_cards'
import 'App.css';
import 'fontsource-roboto';
import {useMetricsTracker} from 'hooks/use_metrics_tracker';
const App: React.FC = () => {
  const {setVisibleSection, timeSpentOnSections} = useMetricsTracker()
  const setVisibleSectionCallback = useCallback((val: string) => {
    setVisibleSection(val)
  }, [setVisibleSection])
  const [cardPosition, setCardPosition] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)

  //whenever the user scrolls, set cardPosition to be on which card the user is (can be decimal such as 0.5 if between card 0 and 1)
  useEffect(() => {
    if (ref.current){
      const log = () => setCardPosition(ref.current!.scrollTop / ref.current!.clientHeight)
      ref.current!.addEventListener('scroll', log)
    }
  }, [ref])

  //whenever the user resizes we want to stay on the same card in the same position by multiplying the new client by the position
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (ref.current){
        ref.current.scrollTop = ref.current!.clientHeight * cardPosition
      }
    }) 
  }, [cardPosition])

  return (
    <div ref = {ref} className='app'>
      <AllCards setVisibleSection={setVisibleSectionCallback} timeSpentOnSections = {timeSpentOnSections} cardPosition = {cardPosition}/>
    </div>
  );
};
export default App;
