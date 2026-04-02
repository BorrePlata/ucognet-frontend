import React from 'react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import Hero from '../sections/Hero';
import Problems from '../sections/Problems';
import ResearchHighlights from '../sections/ResearchHighlights';
import ApplicationsPreview from '../sections/ApplicationsPreview';

export default function HomePage() {
  return (
    <PageTransition>
      <SEO
        title={null}
        description="UCogNet is a modular metacognitive AI platform evaluated on plasma turbulence control (HW2D, 8 controllers, 7D composite) and BCI decoding (BNCI2014001, 9 subjects). Gated evolution, safety budgets, and reproducible benchmarks. By Brainstream."
        path="/"
      />
      <Hero />
      <Problems />
      <ResearchHighlights />
      <ApplicationsPreview />
    </PageTransition>
  );
}
