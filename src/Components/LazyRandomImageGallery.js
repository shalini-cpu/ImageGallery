// LazyRandomImageGallery.js
import React, { lazy, Suspense } from 'react';

const RandomImageGallery = lazy(() => import('./RandomImageGallery'));

const Loader = () => {
  return <div className="loader">Loading...</div>;
};

const LazyRandomImageGallery = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RandomImageGallery />
    </Suspense>
  );
};

export default LazyRandomImageGallery;
