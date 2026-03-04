import React from 'react';
import PageTransition from '../components/PageTransition';
import Hero from '../sections/Hero';
import Problems from '../sections/Problems';
import PlasmaResults from '../sections/PlasmaResults';
import ApplicationsPreview from '../sections/ApplicationsPreview';

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <Problems />
      <PlasmaResults />
      <ApplicationsPreview />
    </PageTransition>
  );
}
