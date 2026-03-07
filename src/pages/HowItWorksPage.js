import React from 'react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import HowItWorks from '../sections/HowItWorks';

export default function HowItWorksPage() {
  return (
    <PageTransition>
      <SEO
        title="How It Works — 10-Module Cognitive Architecture"
        description="Technical overview of UCogNet's modular architecture: cognitive routing, metacognitive task dispatch, evidence-driven execution, and gated evolution under strict safety budgets."
        path="/how-it-works"
      />
      <HowItWorks />
    </PageTransition>
  );
}
