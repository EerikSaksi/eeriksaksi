import React, { Suspense, lazy } from 'react';
import Loading from 'components/cards/loading';
import { TimeSpentOnSections } from 'types';
const Timeline = lazy(() => import('components/cards/timeline'));
const Welcome = lazy(() => import('components/cards/welcome'));
const SecondYear = lazy(() => import('components/cards/second_year'));
const ThirdYear = lazy(() => import('components/cards/third_year'));
const FourthYear = lazy(() => import('components/cards/fourth_year'));
const Uros = lazy(() => import('components/cards/uros'));
const TeamProject = lazy(() => import('components/cards/team_project'));
const SummerProject = lazy(() => import('components/cards/summer_projects'));
const Analytics = lazy(() => import('components/cards/analytics'));

const AllCards: React.FC<{ setVisibleSection: (arg: string) => void; timeSpentOnSections: TimeSpentOnSections }> = ({ setVisibleSection, timeSpentOnSections }) => {
  return (
    <React.Fragment>
      <Suspense fallback={<Loading height={356} />}>
        <Welcome alertCurrentlyVisible={() => setVisibleSection('Welcome')} />
      </Suspense>
      <Suspense fallback={<Loading height={'40vh'} />}>
        <Timeline alertCurrentlyVisible={() => setVisibleSection('Timeline')} />
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <SecondYear alertCurrentlyVisible={() => setVisibleSection('Second Year')} />
      </Suspense>
      <Suspense fallback={<Loading height={417} />}>
        <Uros alertCurrentlyVisible={() => setVisibleSection('UROS')} />
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <ThirdYear alertCurrentlyVisible={() => setVisibleSection('Third Year')} />
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <TeamProject alertCurrentlyVisible={() => setVisibleSection('Third Year Team Project')} />
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <SummerProject alertCurrentlyVisible={() => setVisibleSection('tunety.pe')} />
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <FourthYear alertCurrentlyVisible={() => setVisibleSection('Fourth Year')} />
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <Analytics alertCurrentlyVisible={() => setVisibleSection('Analytics')} timeSpentOnSections={timeSpentOnSections} />
      </Suspense>
    </React.Fragment>
  );
};
export default AllCards;
