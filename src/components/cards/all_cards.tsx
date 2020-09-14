import React, { Suspense, lazy } from 'react';
const Loading = lazy(() => import('components/cards/loading'));
const Timeline = lazy(() => import('components/cards/timeline'))
const Welcome = lazy(() => import('components/cards/welcome'));
const AllCards: React.FC = () => {
  return (
    <Suspense fallback = {<Loading/>}>
      <Welcome />
    </Suspense>
  );
};
export default AllCards;
