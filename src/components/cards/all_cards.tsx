import React, { Suspense, lazy } from 'react';
import Loading from 'components/cards/loading';
const Timeline = lazy(() => import('components/cards/timeline'));
const Welcome = lazy(() => import('components/cards/welcome'));
const AllCards: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loading height={356} />}>
        <Timeline />
      </Suspense>
      <Suspense fallback={<Loading height={356} />}>
        <Welcome />
      </Suspense>
    </>
  );
};
export default AllCards;
