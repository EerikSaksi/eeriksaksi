import React, { Suspense, lazy } from 'react';
import Loading from 'components/cards/loading';
import { TimeSpentOnSections } from 'types';
const Timeline = lazy(() => import('components/cards/timeline'));
const Welcome = lazy(() => import('components/cards/welcome'));
const Rpgym = lazy(() => import('components/cards/rpgym'));
const Uros = lazy(() => import('components/cards/uros'));
const SummerProject = lazy(() => import('components/cards/summer_projects'));
const Analytics = lazy(() => import('components/cards/analytics'));

const AllCards: React.FC<{ setVisibleSection: (arg: string) => void; timeSpentOnSections: TimeSpentOnSections }> = ({ setVisibleSection, timeSpentOnSections }) => {
  return (
    <div style = {{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Suspense fallback={<Loading height={356} />}>
        <Rpgym alertCurrentlyVisible={() => setVisibleSection('Welcome')} />
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <Welcome alertCurrentlyVisible={() => setVisibleSection('Welcome')} />
      </Suspense>
      <Suspense fallback={<Loading height={'40vh'} />}>
        <Timeline alertCurrentlyVisible={() => setVisibleSection('Timeline')} />
      </Suspense>
      <Suspense fallback={<Loading height={417} />}>
        <Uros alertCurrentlyVisible={() => setVisibleSection('UROS')} />
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <SummerProject alertCurrentlyVisible={() => setVisibleSection('tunety.pe')} />
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <Analytics alertCurrentlyVisible={() => setVisibleSection('Analytics')} timeSpentOnSections={timeSpentOnSections} />
      </Suspense>
    </div>
  );
};
export default AllCards;
