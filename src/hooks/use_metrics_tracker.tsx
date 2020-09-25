import { useState, useEffect } from 'react';
import {TimeSpentOnSections} from 'types';
export const useMetricsTracker = () => {
  const [visibleSection, setVisibleSection] = useState('Welcome');
  const [sessionID, setSessionID] = useState('');

  const [timeSpentOnSections, setTimeSpentOnSections] = useState<TimeSpentOnSections>({
    Welcome: 0.0,
    Timeline: 0.0,
    'Second Year': 0.0,
    UROS: 0.0,
    'Third Year': 0.0,
    'Third Year Team Project': 0.0,
    'tunety.pe': 0.0,
    'Fourth Year': 0.0,
    Analytics: 0.0,
  });
  useEffect(() => {
    //if we don't have a session id then fetch one
    if (sessionID === '') {
      fetch('http://localhost:4000/session_id', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          return response.text();
        })
        .then((text) => {
          setSessionID(text);
        });
    }
  }, [sessionID]);
  useEffect(() => {
    //every .1 seconds increment total time spent on each section by 0.1
    const interval = setInterval(() => {
      setTimeSpentOnSections((timeSpentOnSections: TimeSpentOnSections) => {
        //add 0.1 to it
        var newValue = timeSpentOnSections[visibleSection] + 0.5;
        newValue = Math.round((newValue + Number.EPSILON) * 10) / 10;
        var jsonCopy = { ...timeSpentOnSections };
        jsonCopy[visibleSection] = newValue;
        return jsonCopy;
      });
    }, 200);
    return () => {
      clearInterval(interval);
    };
  }, [visibleSection]);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(timeSpentOnSections)
      if (sessionID !== '') {
        fetch('http://localhost:4000/send_session_info', {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionID, ...timeSpentOnSections }),
        });
      }
    }, 1000);
    return () => clearInterval(interval)
  }, [sessionID])
  return { visibleSection, setVisibleSection, timeSpentOnSections };
};
