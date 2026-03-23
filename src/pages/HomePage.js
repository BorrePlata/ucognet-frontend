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
        description="UCogNet is a modular metacognitive AI platform evaluated on BCI decoding (BNCI2014001, 9 subjects) and parametric physics control (5 OOD campaigns). Gated evolution, safety budgets, and reproducible benchmarks. By Brainstream."
        path="/"
      />
      <Hero />
      <Problems />
      <PlasmaResults />
      <ApplicationsPreview />
    </PageTransition>
  );
}
