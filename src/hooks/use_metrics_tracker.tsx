import { useState, useEffect } from 'react';
export const useMetricsTracker = () => {
  const [visibleSection, setVisibleSection] = useState('Welcome');
  const [sessionID, setSessionID] = useState('');

  const [timeSpentOnSections, setTimeSpentOnSections] = useState({
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
      fetch('https://rocky-beyond-02836.herokuapp.com/session_id', {
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
      setTimeSpentOnSections((timeSpentOnSections) => {
        var toReturn = { ...timeSpentOnSections };
        //add 0.1 to it
        var newValue = timeSpentOnSections[visibleSection] + 0.5;

        //round to nearest tenth
        newValue = Math.round((newValue + Number.EPSILON) * 10) / 10;
        toReturn[visibleSection] = newValue;
        return toReturn;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [visibleSection, sessionID]);
  useEffect(() => {
    fetch('https://rocky-beyond-02836.herokuapp.com/send_session_info', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionID, ...timeSpentOnSections }),
    });
  }, [timeSpentOnSections]);

  return { visibleSection, setVisibleSection, timeSpentOnSections };
};
