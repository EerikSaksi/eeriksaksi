import React, { Suspense, lazy } from 'react';
import Loading from 'components/cards/loading';
const Timeline = lazy(() => import('components/cards/timeline'));
const Welcome = lazy(() => import('components/cards/welcome'));
const SecondYear = lazy(() => import('components/cards/second_year'));
const AllCards: React.FC = () => {
  return (
    < >
      <Suspense fallback={<Loading height={356} />}>
        <Welcome />
      </Suspense>
      <Suspense fallback={<Loading height={'40vh'} />}>
        <Timeline/>
      </Suspense>
    </>
  );
};
export default AllCards;
