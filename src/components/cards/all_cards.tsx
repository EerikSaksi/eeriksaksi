import React, { Suspense, lazy, useCallback } from "react";
import Loading from "components/cards/loading";
import { TimeSpentOnSections } from "types";
const Timeline = lazy(() => import("components/cards/timeline"));
const Welcome = lazy(() => import("components/cards/welcome"));
const Rpgym = lazy(() => import("components/cards/rpgym"));
const Uros = lazy(() => import("components/cards/uros"));
const SummerProject = lazy(() => import("components/cards/summer_projects"));
const Analytics = lazy(() => import("components/cards/analytics"));

const AllCards: React.FC<{ setVisibleSection: (arg: string) => void; timeSpentOnSections: TimeSpentOnSections }> = ({ setVisibleSection, timeSpentOnSections }) => {
  const setRpgymVisible = useCallback(() => setVisibleSection("Rpgym"), [setVisibleSection]);
  const setWelcomeVisible = useCallback(() => setVisibleSection("Welcome"), [setVisibleSection]);
  const setTimelineVisible = useCallback(() => setVisibleSection("Timeline"), [setVisibleSection]);
  const setUrosVisible = useCallback(() => setVisibleSection("UROS"), [setVisibleSection]);
  const setTunetypeVisible = useCallback(() => setVisibleSection("tunety.pe"), [setVisibleSection]);
  const setAnalyticsVisible = useCallback(() => setVisibleSection("Analytics"), [setVisibleSection]);
  return (
    <React.Fragment>
      <Suspense fallback={<Loading height={356} />}>
        <Welcome alertCurrentlyVisible={setWelcomeVisible} />
      </Suspense>
      <Suspense fallback={<Loading height={"40vh"} />}>
        <Timeline alertCurrentlyVisible={setTimelineVisible} />
      </Suspense>
      <Suspense fallback={<Loading height={417} />}>
        <Uros alertCurrentlyVisible={setUrosVisible} />
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <Rpgym alertCurrentlyVisible={setRpgymVisible} />
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <SummerProject alertCurrentlyVisible={setTunetypeVisible} />
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <Analytics alertCurrentlyVisible={setAnalyticsVisible} timeSpentOnSections={timeSpentOnSections} />
      </Suspense>
    </React.Fragment>
  );
};
export default AllCards;
