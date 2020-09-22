import React, { Suspense, lazy } from 'react';
import Loading from 'components/cards/loading';
const Timeline = lazy(() => import('components/cards/timeline'));
const Welcome = lazy(() => import('components/cards/welcome'));
const SecondYear = lazy(() => import('components/cards/second_year'));
const ThirdYear = lazy(() => import('components/cards/third_year'));
const FourthYear = lazy(() => import('components/cards/fourth_year'));
const Uros = lazy(() => import('components/cards/uros'));
const TeamProject = lazy(() => import('components/cards/team_project'));
const SummerProject = lazy(() => import('components/cards/summer_projects'));
const AllCards: React.FC = () => {
  return (
    <React.Fragment >
      <Suspense fallback={<Loading height={356} />}>
        <Welcome />
      </Suspense>
      <Suspense fallback={<Loading height={'40vh'} />}>
        <Timeline/>
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <SecondYear />
      </Suspense>
      <Suspense fallback={<Loading height={417} />}>
        <Uros />
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <ThirdYear />
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <TeamProject />
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <SummerProject/>
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <FourthYear />
      </Suspense>
    </React.Fragment >
  );
};
export default AllCards;
