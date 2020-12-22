import React, { Suspense, lazy, useCallback } from "react";
import Loading from "components/cards/loading";
import { TimeSpentOnSections } from "types";
const Timeline = lazy(() => import("components/cards/timeline"));
const Welcome = lazy(() => import("components/cards/welcome"));
const Rpgym = lazy(() => import("components/cards/rpgym"));
const Uros = lazy(() => import("components/cards/uros"));
const SummerProject = lazy(() => import("components/cards/summer_projects"));
const Analytics = lazy(() => import("components/cards/analytics"));

const calcOpacity = (position, cardPosition) => {
  const val = Math.abs(cardPosition - position);
  return val < 1 ? 1 - val : 0;
};
const NotRendered = () => (
  <div
    style={{
      height: "100vh",
      scrollSnapAlign: "center",
      scrollSnapStop: "always",
      alignItems: "center",
      justifyContent: "center",
    }}
  ></div>
);

const AllCards: React.FC<{ setVisibleSection: (arg: string) => void; timeSpentOnSections: TimeSpentOnSections; cardPosition: number }> = ({ setVisibleSection, timeSpentOnSections, cardPosition }) => {
  const setRpgymVisible = useCallback(() => setVisibleSection("Rpgym"), [setVisibleSection]);
  const setWelcomeVisible = useCallback(() => setVisibleSection("Welcome"), [setVisibleSection]);
  const setTimelineVisible = useCallback(() => setVisibleSection("Timeline"), [setVisibleSection]);
  const setUrosVisible = useCallback(() => setVisibleSection("UROS"), [setVisibleSection]);
  const setTunetypeVisible = useCallback(() => setVisibleSection("tunety.pe"), [setVisibleSection]);
  const setAnalyticsVisible = useCallback(() => setVisibleSection("Analytics"), [setVisibleSection]);
  return (
    <React.Fragment>
      <Suspense fallback={<Loading height={356} />}>
        <Welcome alertCurrentlyVisible={setWelcomeVisible} backgroundOpacity={calcOpacity(0, cardPosition)} />
      </Suspense>
      <Suspense fallback={<NotRendered />}>
        <Timeline alertCurrentlyVisible={setTimelineVisible} backgroundOpacity={calcOpacity(1, cardPosition)} />
      </Suspense>
      {cardPosition < 1 ? (
        <NotRendered />
      ) : (
        <Suspense fallback={<Loading height={417} />}>
          <Uros alertCurrentlyVisible={setUrosVisible} backgroundOpacity={calcOpacity(2, cardPosition)} />
        </Suspense>
      )}
      {cardPosition < 2 ? (
        <NotRendered />
      ) : (
        <Suspense fallback={<Loading height={"80vh"} width={"45vh"} />}>
          <Rpgym alertCurrentlyVisible={setRpgymVisible} backgroundOpacity={calcOpacity(2, cardPosition)} />
        </Suspense>
      )}
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
