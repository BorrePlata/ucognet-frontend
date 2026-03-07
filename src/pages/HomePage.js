import React from 'react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import Hero from '../sections/Hero';
import Problems from '../sections/Problems';
import PlasmaResults from '../sections/PlasmaResults';
import ApplicationsPreview from '../sections/ApplicationsPreview';

export default function HomePage() {
  return (
    <PageTransition>
      <SEO
        title={null}
        description="UCogNet is a modular metacognitive AI platform with gated evolution, safety budgets, and 807 reproducible tests across 10 cognitive modules. By Brainstream."
        path="/"
      />
      <Hero />
      <Problems />
      <PlasmaResults />
      <ApplicationsPreview />
    </PageTransition>
  );
}
