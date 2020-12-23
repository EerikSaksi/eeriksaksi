import React, {useCallback, useState } from "react";
import { TimeSpentOnSections } from "types";
import Timeline from "components/cards/timeline"
import Welcome from "components/cards/welcome"
import Rpgym from "components/cards/rpgym"
import Uros from "components/cards/uros"
import SummerProject from "components/cards/summer_projects"
import Analytics from "components/cards/analytics"

const calcOpacity = (position, cardPosition) => {
  const val = Math.abs(cardPosition - position);
  return val < 1 ? 1 - val : 0;
};

const AllCards: React.FC<{ setVisibleSection: (arg: string) => void; timeSpentOnSections: TimeSpentOnSections; cardPosition: number }> = ({ setVisibleSection, timeSpentOnSections, cardPosition }) => {
  const setRpgymVisible = useCallback(() => setVisibleSection("Rpgym"), [setVisibleSection]);
  const setWelcomeVisible = useCallback(() => setVisibleSection("Welcome"), [setVisibleSection]);
  const setTimelineVisible = useCallback(() => setVisibleSection("Timeline"), [setVisibleSection]);
  const setUrosVisible = useCallback(() => setVisibleSection("UROS"), [setVisibleSection]);
  const setTunetypeVisible = useCallback(() => setVisibleSection("tunety.pe"), [setVisibleSection]);
  const setAnalyticsVisible = useCallback(() => setVisibleSection("Analytics"), [setVisibleSection]);
  return (
    <React.Fragment>
      <Welcome alertCurrentlyVisible={setWelcomeVisible} backgroundOpacity={calcOpacity(0, cardPosition)} />
      <Timeline alertCurrentlyVisible={setTimelineVisible} backgroundOpacity={calcOpacity(1, cardPosition)} />
      <Uros alertCurrentlyVisible={setUrosVisible} backgroundOpacity={calcOpacity(2, cardPosition)} />
    </React.Fragment>
  );
};
export default AllCards;
//     <Suspense fallback={<Loading height={356} />}>
//       <SummerProject alertCurrentlyVisible={setTunetypeVisible} />
//     </Suspense>
//     <Suspense fallback={<Loading height={356} />}>
//       <Analytics alertCurrentlyVisible={setAnalyticsVisible} timeSpentOnSections={timeSpentOnSections} />
//     </Suspense>
